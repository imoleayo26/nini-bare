"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/storefront/Header";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/catalog";
import type { CheckoutDetails } from "@/lib/checkout";

type FieldErrorKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "addressLine1"
  | "city"
  | "state"
  | "country";

type FieldErrors = Partial<Record<FieldErrorKey, string>>;

const initialDetails: CheckoutDetails = {
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  delivery: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "Nigeria",
  },
};

function validateDetails(
  details: CheckoutDetails,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!details.customer.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (details.customer.firstName.trim().length < 2) {
    errors.firstName = "Please enter a valid first name.";
  }

  if (!details.customer.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (details.customer.lastName.trim().length < 2) {
    errors.lastName = "Please enter a valid last name.";
  }

  if (!details.customer.email.trim()) {
    errors.email = "Email address is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      details.customer.email.trim(),
    )
  ) {
    errors.email = "Please enter a valid email address.";
  }

  const normalizedPhone = details.customer.phone.replace(
    /[\s\-()]/g,
    "",
  );

  if (!details.customer.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (
    !/^(?:\+234|0)\d{10}$/.test(normalizedPhone)
  ) {
    errors.phone =
      "Enter a valid Nigerian phone number.";
  }

  if (!details.delivery.addressLine1.trim()) {
    errors.addressLine1 = "Delivery address is required.";
  } else if (
    details.delivery.addressLine1.trim().length < 5
  ) {
    errors.addressLine1 =
      "Please enter a more complete address.";
  }

  if (!details.delivery.city.trim()) {
    errors.city = "City is required.";
  } else if (details.delivery.city.trim().length < 2) {
    errors.city = "Please enter a valid city.";
  }

  if (!details.delivery.state.trim()) {
    errors.state = "State is required.";
  } else if (details.delivery.state.trim().length < 2) {
    errors.state = "Please enter a valid state.";
  }

  if (!details.delivery.country.trim()) {
    errors.country = "Country is required.";
  }

  return errors;
}

export default function CheckoutPage() {
  const { cart, subtotal, hydrated } = useCart();

  const [details, setDetails] =
    useState<CheckoutDetails>(initialDetails);

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [validated, setValidated] = useState(false);


  function updateCustomer(
    field: keyof CheckoutDetails["customer"],
    value: string,
  ) {
    setDetails((current) => ({
      ...current,
      customer: {
        ...current.customer,
        [field]: value,
      },
    }));

    setValidated(false);

    setErrors((current) => {
      const next = { ...current };
      delete next[field as FieldErrorKey];
      return next;
    });
  }

  function updateDelivery(
    field: keyof CheckoutDetails["delivery"],
    value: string,
  ) {
    setDetails((current) => ({
      ...current,
      delivery: {
        ...current.delivery,
        [field]: value,
      },
    }));

    setValidated(false);

    setErrors((current) => {
      const next = { ...current };
      delete next[field as FieldErrorKey];
      return next;
    });
  }

  function handleValidate() {
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {

      setValidated(true);

      return;
    }

    setValidated(false);
  }

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-nb-white text-nb-ink">
        <Header />

        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-center text-sm text-nb-ink/50">
            Loading checkout...
          </p>
        </section>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-nb-white text-nb-ink">
        <Header />

        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-5xl">♡</p>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-nb-berry">
            Your bag is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-nb-ink/60">
            Add something to your bag before continuing to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full bg-nb-berry px-7 py-3 text-sm font-semibold text-white transition hover:bg-nb-rose"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleValidate();
        }}
      >
        <section className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
          <div className="border-b border-nb-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
              Almost there
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Checkout
            </h1>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <section>
              <div className="rounded-2xl border border-nb-border bg-white p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-nb-berry">
                  Contact information
                </h2>

                <p className="mt-2 text-sm leading-6 text-nb-ink/60">
                  We’ll use these details to confirm your order and contact you
                  about delivery.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-nb-berry">
                      First name
                    </span>

                    <input
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={details.customer.firstName}
                      onChange={(event) =>
                        updateCustomer(
                          "firstName",
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.firstName)}
                      className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                        errors.firstName
                          ? "border-nb-rose"
                          : "border-nb-border focus:border-nb-rose"
                      }`}
                    />

                    {errors.firstName && (
                      <p className="mt-2 text-xs text-nb-rose">
                        {errors.firstName}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-nb-berry">
                      Last name
                    </span>

                    <input
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={details.customer.lastName}
                      onChange={(event) =>
                        updateCustomer(
                          "lastName",
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.lastName)}
                      className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                        errors.lastName
                          ? "border-nb-rose"
                          : "border-nb-border focus:border-nb-rose"
                      }`}
                    />

                    {errors.lastName && (
                      <p className="mt-2 text-xs text-nb-rose">
                        {errors.lastName}
                      </p>
                    )}
                  </label>                  <label className="block sm:col-span-2">
                    <span className="text-sm font-semibold text-nb-berry">
                      Email address
                    </span>

                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={details.customer.email}
                      onChange={(event) =>
                        updateCustomer(
                          "email",
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.email)}
                      className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                        errors.email
                          ? "border-nb-rose"
                          : "border-nb-border focus:border-nb-rose"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-2 text-xs text-nb-rose">
                        {errors.email}
                      </p>
                    )}
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-sm font-semibold text-nb-berry">
                      Phone number
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="0800 000 0000"
                      value={details.customer.phone}
                      onChange={(event) =>
                        updateCustomer(
                          "phone",
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.phone)}
                      className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                        errors.phone
                          ? "border-nb-rose"
                          : "border-nb-border focus:border-nb-rose"
                      }`}
                    />

                    {errors.phone && (
                      <p className="mt-2 text-xs text-nb-rose">
                        {errors.phone}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-nb-border bg-white p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-nb-berry">
                  Delivery address
                </h2>

                <p className="mt-2 text-sm leading-6 text-nb-ink/60">
                  Tell us where you’d like your Nini Bare order delivered.
                </p>

                <div className="mt-6 grid gap-5">
                  <label className="block">
                    <span className="text-sm font-semibold text-nb-berry">
                      Address
                    </span>

                    <input
                      type="text"
                      name="addressLine1"
                      autoComplete="street-address"
                      placeholder="Street address"
                      value={details.delivery.addressLine1}
                      onChange={(event) =>
                        updateDelivery(
                          "addressLine1",
                          event.target.value,
                        )
                      }
                      aria-invalid={Boolean(errors.addressLine1)}
                      className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                        errors.addressLine1
                          ? "border-nb-rose"
                          : "border-nb-border focus:border-nb-rose"
                      }`}
                    />

                    {errors.addressLine1 && (
                      <p className="mt-2 text-xs text-nb-rose">
                        {errors.addressLine1}
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-nb-berry">
                      Apartment, suite or landmark
                      <span className="ml-1 font-normal text-nb-ink/40">
                        (optional)
                      </span>
                    </span>

                    <input
                      type="text"
                      name="addressLine2"
                      autoComplete="address-line2"
                      placeholder="Apartment, suite, landmark"
                      value={details.delivery.addressLine2 ?? ""}
                      onChange={(event) =>
                        updateDelivery(
                          "addressLine2",
                          event.target.value,
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-nb-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:border-nb-rose focus:ring-2 focus:ring-nb-rose/10"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-semibold text-nb-berry">
                        City
                      </span>

                      <input
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        placeholder="City"
                        value={details.delivery.city}
                        onChange={(event) =>
                          updateDelivery(
                            "city",
                            event.target.value,
                          )
                        }
                        aria-invalid={Boolean(errors.city)}
                        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                          errors.city
                            ? "border-nb-rose"
                            : "border-nb-border focus:border-nb-rose"
                        }`}
                      />

                      {errors.city && (
                        <p className="mt-2 text-xs text-nb-rose">
                          {errors.city}
                        </p>
                      )}
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-nb-berry">
                        State
                      </span>

                      <input
                        type="text"
                        name="state"
                        autoComplete="address-level1"
                        placeholder="State"
                        value={details.delivery.state}
                        onChange={(event) =>
                          updateDelivery(
                            "state",
                            event.target.value,
                          )
                        }
                        aria-invalid={Boolean(errors.state)}
                        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-nb-ink/30 focus:ring-2 focus:ring-nb-rose/10 ${
                          errors.state
                            ? "border-nb-rose"
                            : "border-nb-border focus:border-nb-rose"
                        }`}
                      />

                      {errors.state && (
                        <p className="mt-2 text-xs text-nb-rose">
                          {errors.state}
                        </p>
                      )}
                    </label>
                  </div>                <label className="block">
                  <span className="text-sm font-semibold text-nb-berry">
                    Country
                  </span>

                  <input
                    type="text"
                    name="country"
                    autoComplete="country-name"
                    value={details.delivery.country}
                    onChange={(event) =>
                      updateDelivery(
                        "country",
                        event.target.value,
                      )
                    }
                    aria-invalid={Boolean(errors.country)}
                    className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-nb-rose/10 ${
                      errors.country
                        ? "border-nb-rose"
                        : "border-nb-border focus:border-nb-rose"
                    }`}
                  />

                  {errors.country && (
                    <p className="mt-2 text-xs text-nb-rose">
                      {errors.country}
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-nb-border bg-nb-blush p-6">
              <h2 className="text-lg font-semibold text-nb-berry">
                Payment
              </h2>

              <p className="mt-2 text-sm leading-6 text-nb-ink/60">
                Secure online payment will be available here once Paystack is
                connected.
              </p>

              <div className="mt-5 rounded-xl border border-nb-border bg-white px-4 py-4 text-sm text-nb-ink/60">
                Payment integration coming next.
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-nb-border bg-nb-blush p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-nb-berry">
              Order summary
            </h2>

            <div className="mt-6 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3"
                >
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.productName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-nb-ink/40">
                        Nini Bare
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-nb-berry">
                      {item.productName}
                    </p>

                    <p className="mt-1 text-xs text-nb-ink/50">
                      {item.size
                        ? `Size: ${item.size}`
                        : "Standard size"}
                      {item.color ? ` · ${item.color}` : ""}
                    </p>

                    <p className="mt-1 text-xs text-nb-ink/50">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-nb-ink">
                    {formatMoney({
                      amount: item.unitPrice * item.quantity,
                      currency: item.currency,
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-nb-border pt-5">
              <span className="text-sm text-nb-ink/60">
                Subtotal
              </span>

              <span className="text-lg font-semibold text-nb-berry">
                {formatMoney({
                  amount: subtotal,
                  currency: "NGN",
                })}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-nb-ink/50">
              Delivery fees will be calculated before payment.
            </p>

            {validated && (
              <div
                role="status"
                className="mt-5 rounded-xl border border-nb-border bg-white px-4 py-3 text-sm text-nb-berry"
              >
                Your checkout details look good. Payment setup is the next
                step.
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-nb-berry px-6 py-4 text-sm font-semibold text-white transition hover:bg-nb-rose"
            >
              {validated
                ? "Details validated ✓"
                : "Review checkout details"}
            </button>

            <Link
              href="/cart"
              className="mt-4 block text-center text-xs font-semibold text-nb-rose transition hover:text-nb-berry"
            >
              Return to bag
            </Link>
          </aside>
        </div>
      </section>
      </form>
    </main>
  );
}
