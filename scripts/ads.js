// Simple ad handling logic
export function showAds() {
  document.querySelectorAll('.ad-slot').forEach(ad => ad.style.display = 'block');
}

export function hideAds() {
  document.querySelectorAll('.ad-slot').forEach(ad => ad.style.display = 'none');
}

// Rewarded Premium Timer (12 hours)
export function isRewardedActive() {
  const end = localStorage.getItem('rewardedPremiumEnd');
  return end && Date.now() < parseInt(end);
}

export function grantRewardedPremium(hours = 12) {
  const expireTime = Date.now() + hours*60*60*1000;
  localStorage.setItem('rewardedPremiumEnd', expireTime);
  hideAds();
}
