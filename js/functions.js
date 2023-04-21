
  window.addEventListener("DOMContentLoaded", (event) => {
    var zoomediv = document.getElementById('page_connections')

var zoomin_button = document.querySelector('#zoomin')
howmuch = 100
zoomin_button.addEventListener('click', function(){
  howmuch = howmuch+10
  zoomediv.style.zoom = howmuch.toString()+'%'
})

var zoomout_button = document.querySelector('#zoomout')
zoomout_button.addEventListener('click', () => {
  howmuch = howmuch-10
  zoomediv.style.zoom = howmuch.toString()+'%'
}) 
});
