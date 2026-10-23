/* ============================================================
   ShopEase — Checkout Page JavaScript
   Features: Form validation, payment toggle, order placement,
             real-time validation feedback
   ============================================================ */

"use strict";

// ===== CHECKOUT DOM ELEMENTS =====
const checkoutDOM = {
    form: document.getElementById("checkout-form"),
    itemsContainer: document.getElementById("checkout-items"),
    subtotal: document.getElementById("checkout-subtotal"),
    shipping: document.getElementById("checkout-shipping"),
    tax: document.getElementById("checkout-tax"),
    total: document.getElementById("checkout-total"),
    placeOrderBtn: document.getElementById("place-order-btn"),
    successModal: document.getElementById("order-success-modal"),
    orderIdDisplay: document.getElementById("order-id-display"),

    // Payment sections
    cardDetails: document.getElementById("card-details"),
    upiDetails: document.getElementById("upi-details"),
    paymentRadios: document.querySelectorAll('input[name="payment"]'),

    // Form Fields
    firstName: document.getElementById("first-name"),
    lastName: document.getElementById("last-name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    address: document.getElementById("address"),
    city: document.getElementById("city"),
    stateSelect: document.getElementById("state"),
    pincode: document.getElementById("pincode"),
    cardNumber: document.getElementById("card-number"),
    cardExpiry: document.getElementById("card-expiry"),
    cardCvv: document.getElementById("card-cvv"),
    upiId: document.getElementById("upi-id")
};

// ===== VALIDATION RULES (Object) =====
const validationRules = {
    firstName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
            required: "First name is required",
            minLength: "Must be at least 2 characters",
            pattern: "Only letters are allowed"
        }
    },
    lastName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
            required: "Last name is required",
            minLength: "Must be at least 2 characters",
            pattern: "Only letters are allowed"
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        messages: {
            required: "Email address is required",
            pattern: "Please enter a valid email address"
        }
    },
    phone: {
        required: true,
        pattern: /^[+]?[\d\s-]{10,15}$/,
        messages: {
            required: "Phone number is required",
            pattern: "Please enter a valid phone number"
        }
    },
    address: {
        required: true,
        minLength: 5,
        messages: {
            required: "Street address is required",
            minLength: "Address must be at least 5 characters"
        }
    },
    city: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        messages: {
            required: "City is required",
            minLength: "Must be at least 2 characters",
            pattern: "Only letters are allowed"
        }
    },
    state: {
        required: true,
        messages: {
            required: "Please select a state"
        }
    },
    pincode: {
        required: true,
        pattern: /^\d{6}$/,
        messages: {
            required: "PIN code is required",
            pattern: "Must be a 6-digit number"
        }
    },
    cardNumber: {
        required: true,
        pattern: /^[\d\s]{13,19}$/,
        messages: {
            required: "Card number is required",
            pattern: "Please enter a valid card number"
        }
    },
    cardExpiry: {
        required: true,
        pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
        messages: {
            required: "Expiry date is required",
            pattern: "Use MM/YY format"
        }
    },
    cardCvv: {
        required: true,
        pattern: /^\d{3}$/,
        messages: {
            required: "CVV is required",
            pattern: "Must be a 3-digit number"
        }
    },
    upiId: {
        required: true,
        pattern: /^[\w.-]+@[\w]+$/,
        messages: {
            required: "UPI ID is required",
            pattern: "Please enter a valid UPI ID (e.g., name@upi)"
        }
    }
};

// ===== VALIDATION FUNCTIONS =====

/**
 * Validate a single form field
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value of the field
 * @returns {string} Error message or empty string if valid
 */
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return "";

    const trimmedValue = value.trim();

    // Required check
    if (rules.required && !trimmedValue) {
        return rules.messages.required;
    }

    // MinLength check
    if (rules.minLength && trimmedValue.length < rules.minLength) {
        return rules.messages.minLength;
    }

    // Pattern check
    if (rules.pattern && trimmedValue && !rules.pattern.test(trimmedValue)) {
        return rules.messages.pattern;
    }

    return ""; // Valid
}

/**
 * Show validation error on a field
 * @param {HTMLElement} input - The input element
 * @param {string} errorMessage - Error message to display
 */
function showFieldError(input, errorMessage) {
    if (!input) return;

    input.classList.remove("valid");
    input.classList.add("error");

    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = errorMessage;
}

/**
 * Show validation success on a field
 * @param {HTMLElement} input - The input element
 */
function showFieldSuccess(input) {
    if (!input) return;

    input.classList.remove("error");
    input.classList.add("valid");

    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = "";
}

/**
 * Clear validation state from a field
 * @param {HTMLElement} input - The input element
 */
function clearFieldState(input) {
    if (!input) return;

    input.classList.remove("error", "valid");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = "";
}

/**
 * Validate a single input and update UI
 * @param {HTMLElement} input - The input element
 * @param {string} ruleName - The validation rule name
 * @returns {boolean} Whether the field is valid
 */
function validateAndShow(input, ruleName) {
    if (!input) return true;

    const value = input.value;
    const error = validateField(ruleName, value);

    if (error) {
        showFieldError(input, error);
        return false;
    } else if (value.trim()) {
        showFieldSuccess(input);
        return true;
    } else {
        clearFieldState(input);
        return false;
    }
}

// ===== CHECKOUT RENDERING =====

/**
 * Render checkout items in the sidebar summary
 */
function renderCheckoutItems() {
    if (!checkoutDOM.itemsContainer) return;

    const cart = state.cart;

    if (cart.length === 0) {
        checkoutDOM.itemsContainer.innerHTML = `
            <p style="color: var(--text-muted); text-align: center; padding: var(--space-4);">
                No items in cart. <a href="index.html" style="color: var(--primary);">Start shopping</a>
            </p>
        `;
        if (checkoutDOM.placeOrderBtn) checkoutDOM.placeOrderBtn.disabled = true;
        return;
    }

    checkoutDOM.itemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img class="checkout-item-image" src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join("");

    updateCheckoutSummary();
}

/**
 * Update checkout order summary totals
 */
function updateCheckoutSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    if (checkoutDOM.subtotal) checkoutDOM.subtotal.textContent = formatPrice(subtotal);
    if (checkoutDOM.shipping) checkoutDOM.shipping.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
    if (checkoutDOM.tax) checkoutDOM.tax.textContent = formatPrice(tax);
    if (checkoutDOM.total) checkoutDOM.total.textContent = formatPrice(total);
}

// ===== PAYMENT METHOD TOGGLE =====

/**
 * Toggle payment detail sections based on selected radio
 */
function handlePaymentToggle() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) return;

    const value = selectedPayment.value;

    // Show/hide payment sections
    if (checkoutDOM.cardDetails) {
        checkoutDOM.cardDetails.style.display = value === "card" ? "block" : "none";
    }
    if (checkoutDOM.upiDetails) {
        checkoutDOM.upiDetails.style.display = value === "upi" ? "block" : "none";
    }

    // Clear validation on hidden fields
    if (value !== "card") {
        [checkoutDOM.cardNumber, checkoutDOM.cardExpiry, checkoutDOM.cardCvv].forEach(clearFieldState);
    }
    if (value !== "upi") {
        clearFieldState(checkoutDOM.upiId);
    }
}

// ===== CARD NUMBER FORMATTING =====

/**
 * Format card number with spaces every 4 digits
 * @param {HTMLInputElement} input - Card number input
 */
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = value.substring(0, 19);
}

/**
 * Format card expiry as MM/YY
 * @param {HTMLInputElement} input - Expiry input
 */
function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    input.value = value.substring(0, 5);
}

// ===== FORM SUBMISSION =====

/**
 * Validate the entire checkout form
 * @returns {boolean} Whether the form is valid
 */
function validateForm() {
    let isValid = true;
    const fieldsToValidate = [
        { input: checkoutDOM.firstName, rule: "firstName" },
        { input: checkoutDOM.lastName, rule: "lastName" },
        { input: checkoutDOM.email, rule: "email" },
        { input: checkoutDOM.phone, rule: "phone" },
        { input: checkoutDOM.address, rule: "address" },
        { input: checkoutDOM.city, rule: "city" },
        { input: checkoutDOM.stateSelect, rule: "state" },
        { input: checkoutDOM.pincode, rule: "pincode" }
    ];

    // Add payment-specific fields
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment) {
        if (selectedPayment.value === "card") {
            fieldsToValidate.push(
                { input: checkoutDOM.cardNumber, rule: "cardNumber" },
                { input: checkoutDOM.cardExpiry, rule: "cardExpiry" },
                { input: checkoutDOM.cardCvv, rule: "cardCvv" }
            );
        } else if (selectedPayment.value === "upi") {
            fieldsToValidate.push(
                { input: checkoutDOM.upiId, rule: "upiId" }
            );
        }
    }

    // Validate each field
    fieldsToValidate.forEach(({ input, rule }) => {
        if (!validateAndShow(input, rule)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Generate a random order ID
 * @returns {string} Order ID string
 */
function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `#SE-${timestamp}${random}`;
}

/**
 * Handle form submission — place order
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Check if cart is empty
    if (state.cart.length === 0) {
        showToast("Your cart is empty! Add some items first.", "warning");
        return;
    }

    // Validate form
    if (!validateForm()) {
        showToast("Please fix the errors in the form.", "error");

        // Scroll to first error
        const firstError = document.querySelector(".form-input.error");
        if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            firstError.focus();
        }
        return;
    }

    // Place order — simulate success
    const orderId = generateOrderId();

    // Show success modal
    if (checkoutDOM.orderIdDisplay) {
        checkoutDOM.orderIdDisplay.textContent = orderId;
    }
    if (checkoutDOM.successModal) {
        checkoutDOM.successModal.style.display = "flex";
    }

    // Clear cart
    state.cart = [];
    saveCart();
    updateCartCount();

    showToast("🎉 Order placed successfully!", "success", 5000);
}

// ===== EVENT LISTENERS =====

document.addEventListener("DOMContentLoaded", () => {
    // Render checkout items
    renderCheckoutItems();

    // Form submission
    if (checkoutDOM.form) {
        checkoutDOM.form.addEventListener("submit", handleFormSubmit);
    }

    // Payment method toggle
    checkoutDOM.paymentRadios.forEach(radio => {
        radio.addEventListener("change", handlePaymentToggle);
    });

    // Real-time field validation (on blur)
    const realTimeFields = [
        { el: checkoutDOM.firstName, rule: "firstName" },
        { el: checkoutDOM.lastName, rule: "lastName" },
        { el: checkoutDOM.email, rule: "email" },
        { el: checkoutDOM.phone, rule: "phone" },
        { el: checkoutDOM.address, rule: "address" },
        { el: checkoutDOM.city, rule: "city" },
        { el: checkoutDOM.stateSelect, rule: "state" },
        { el: checkoutDOM.pincode, rule: "pincode" },
        { el: checkoutDOM.cardNumber, rule: "cardNumber" },
        { el: checkoutDOM.cardExpiry, rule: "cardExpiry" },
        { el: checkoutDOM.cardCvv, rule: "cardCvv" },
        { el: checkoutDOM.upiId, rule: "upiId" }
    ];

    realTimeFields.forEach(({ el, rule }) => {
        if (el) {
            el.addEventListener("blur", () => validateAndShow(el, rule));
            el.addEventListener("input", () => {
                if (el.classList.contains("error")) {
                    validateAndShow(el, rule);
                }
            });
        }
    });

    // Card number formatting
    if (checkoutDOM.cardNumber) {
        checkoutDOM.cardNumber.addEventListener("input", () => {
            formatCardNumber(checkoutDOM.cardNumber);
        });
    }

    // Card expiry formatting
    if (checkoutDOM.cardExpiry) {
        checkoutDOM.cardExpiry.addEventListener("input", () => {
            formatCardExpiry(checkoutDOM.cardExpiry);
        });
    }

    // CVV — digits only
    if (checkoutDOM.cardCvv) {
        checkoutDOM.cardCvv.addEventListener("input", () => {
            checkoutDOM.cardCvv.value = checkoutDOM.cardCvv.value.replace(/\D/g, "").substring(0, 3);
        });
    }

    // Pincode — digits only
    if (checkoutDOM.pincode) {
        checkoutDOM.pincode.addEventListener("input", () => {
            checkoutDOM.pincode.value = checkoutDOM.pincode.value.replace(/\D/g, "").substring(0, 6);
        });
    }
});
