<template>
<div id="app">
  <div class="header">
    <div class="title">
      <img class="logo" src="/images/BYU-AV.svg">
      <svg height="3em" width="1em">
        <line x1=".36em" y1="0" x2=".36em" y2="3em" style="stroke: #ffffff; stroke-width: 1"></line>
      </svg>
      <h1 style="margin: .33em 0;">Timekeeper</h1>
    </div>
    <svg height="1em" width="30em">
      <line x1="0" y1=".36em" x2="30em" y2=".36em" style="stroke: #ffffff; stroke-width: 1"></line>
    </svg>
    <div class="subtitle">
      <router-link class="headLink" to="/">HOME</router-link>
      <router-link class="headLink" to="/user">USER</router-link>
    </div>
  </div>
  <div class="content">
    <router-view/>
  </div>
</div>
</template>

<style>
html {
  height: 100vh;
}

body {
  font-family: 'montserrat', sans-serif;
  font-size: 16px;
  background: #ffffff;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 54em;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.headLink {
  font-size: 1.33em;
  margin: 1.33em;
}

.adminContent {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.adminForm {
  display: inline;
  margin-bottom: 3em;
}

.logo {
  height: 2em;
}

.title {
  display: flex;
  align-items: center;
  margin-top: .66em;
}

.title * {
  margin: .66em 0 .66em 0;
}

.title svg {
  margin: 0;
}

.subtitle {
  margin: .33em;
  margin-bottom: 1em;
}

.subtitle h5, h6 {
  display: inline;
  margin: 0 .066em;
}

.subtitle a:link {
  text-decoration: none;
  color: white;
}

.subtitle a:visited {
  text-decoration: none;
  color: white;
}

.subtitle a:hover {
  text-decoration: none;
  color: white;
}

.subtitle a:active {
  text-decoration: none;
  color: white;
}

.form h3 {
  margin: .5em 0 .5em 0;
}

.header {
  display: flex;
  justify-content: center;
  background-color: #002E5D;
  color: #ffffff;
}

.content {
  margin: 3em;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#swapButton {
  margin-top: auto;
  align-self: center;
  width: 15em;
  height: 3em;
}

.content > div > div {
  display: inline-block;
  margin: 1em;
}

.order {
  min-width: 17.3em;
}

.adminContent {
  margin: 3em;
  display: flex;
}

.adminContent > div > div {
  display: inline-block;
  margin: 1em;
}

.times {
  display: inline-block;
  margin: 0 .3em 0 .3em;
}

input, textarea, select, button {
  font-family: 'montserrat', sans-serif;
  font-size: 1em;
}

.workOrderDB {
  margin: 1em;
  min-width: 44em;
}

table {
  text-align: left;
  width: 100%;
  min-width: 44em;
  max-width: 66em;
  table-layout:fixed;
  border-collapse: collapse;
}

tr {
  padding-right: 1em;
}

td {
  overflow: hidden;
  white-space: nowrap;
}

.c1 {
  width: 100%;
  min-width: 24em;
  max-width: 40em;
}

.c2 {
  width: 8em;
}

.c3 {
  width: 10em;
}

.c1, .c2, .c3 {
  padding: 0 1em;
}

.c4, .c5, .c6 {
  width: 2em;
}

.dataElement {
  padding: 0 1em;
}

.dataElement input {
  border: none;
  padding: 0 0 0 .03em;
}

.nameInput {
  width: 100%;
  min-width: 12em;
  max-width: 36em;
}

.numberInput {
  width: 8em;
  height: 1.3em;
}

.dateInput {
  width: 10em;
  height: 1.3em;
}

.tableHead {
  font-family: 'montserrat', sans-serif;
  height: 2em;
}

tr {
  height: 2em;
}

.dark {
  background-color: #00000036;
}

.rowButton {
  display: block;
  cursor: pointer;
  opacity: .33;
  border: none;
  outline:none;
  height: 1.66em;
  width: 1.66em;
  background-color: transparent;
}

.fullOpacity, tr:hover .rowButton {
  opacity: 1;
}

</style>
