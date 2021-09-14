function showToast(text) {
  var x = document.getElementById("toast");
  x.classList.add("show");
  x.innerHTML = text;
  setTimeout(function() {
    x.classList.remove("show");
  }, 2500);
}
function showToast1(text) {
  var x = document.getElementById("toast1");
  x.classList.add("show");
  x.innerHTML = text;
  setTimeout(function() {
    x.classList.remove("show");
  }, 2500);
}
function showToast2(text) {
  var x = document.getElementById("toast2");
  x.classList.add("show");
  x.innerHTML = text;
  setTimeout(function() {
    x.classList.remove("show");
  }, 2500);
}
