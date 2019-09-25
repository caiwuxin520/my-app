<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './assets/js/rem'
export default {
  name: 'App'
}
//ios禁止缩放
window.onload = function() {
  document.addEventListener("touchstart", function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function(event) {
    event.preventDefault();
  });
};
</script>

<style>
</style>

<style>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
#app {
  height: 100%;
  font-size: 0.28rem;
  background-color: #f1f1f1;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
/* 淘宝初始化样式 */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
small {
  font-size: 12px;
}
p,
ul {
  margin: 0;
  padding: 0;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
  outline: none;
  border: 0;
}
.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.clearDiv:after {
  content: "";
  display: block;
  clear: both;
}
</style>
