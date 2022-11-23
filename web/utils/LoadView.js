// 加载topbar
async function load(id) {
  let topbarText = await fetch('/web/components/topbar/index.html').then(
    (response) => response.text()
  )
  document.querySelector('.topbar').innerHTML = topbarText
  if (!id) return
  document.querySelector(`#${id}`).style.color = '#0a58ca'
}

export { load }
