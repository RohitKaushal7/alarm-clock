const API_TOKEN = 'tk_hxfxm63gnyxa5ur4z1lr60yt93upp' // don't worry this is set to expire

export const sendMassage = (title: string, body: string = '') => {
  if (window.location.href.includes('localhost')) return
  const browserInfo = navigator.userAgent
  fetch('https://ntfy.rohitkaushal.dev/pages', {
    method: 'POST',
    body: `${body}\n\n${browserInfo}`,
    headers: {
      Title: title,
      Authorization: `Bearer ${API_TOKEN}`,
    },
  })
}
