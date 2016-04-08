var R = require('npm:ramda')
var qs = require('npm:qs')
var h = require('npm:hyperscript')
// get url from server
var getLoginUrl = _ => most.fromPromise(fetch('/login').then(res => res.json()))
// handle login
most.fromEvent('click', document.getElementById('login'))
  .flatMap(getLoginUrl)
  .observe(res => window.location.href = res.url)

if (R.equals(window.location.pathname, '/authorize')) {
  console.log(qs.parse(window.location.search))
  //window.location.pathname = '/'
  document.body.appendChild(h('h3', ['Login Success, have JWT']))
  setTimeout(function() {
    window.location.href = '/'    
  }, 5000)

}
