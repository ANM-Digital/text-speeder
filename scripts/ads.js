// Stripe integration (Netlify functions)
export async function checkoutPro() {
  const res = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: "prod_TBGWcCeAc21K2T" }) // change to your product
  });
  const data = await res.json();
  window.location.href = data.url;
}

export function unlockPro() {
  localStorage.setItem('purchasedPro', 'true');
}

