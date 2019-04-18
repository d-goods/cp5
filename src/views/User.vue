<template>
<div class="userSurround">
  <div v-if="user">
    <div class="userContainer">
      <h2 style="color: #002E5D; margin: .33em .13em;">{{user.name}}</h2>
      <div @click="logout" class="logout">
        <h3>LOGOUT</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path style="fill: none" d="M0 0h24v24H0z"/>
          <path id="but" d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
        </svg>
      </div>
    </div>
    <div class="adminContent">
      <h2>Add a work order to the database:</h2>
      <div class="adminForm">
        <div class="name">
          <h3>Event Name:</h3>
          <input v-model="name" placeholder="Event Name">
        </div>
        <div>
            <h3>Order Number:</h3>
            <input v-model="number" placeholder="AV-#####-##">
          </div>
        <div>
          <h3>Event Date:</h3>
          <input type="date" v-model="date"/>
        </div>
        <div>
          <button @click="submitOrder">Add Order</button>
        </div>
      </div>
      <h2><i>Your</i> Current Work Orders:</h2>
      <div class="workOrderDB">
        <table>
          <tr>
            <th class="c1">Name</th>
            <th class="c2">Number</th>
            <th class="c3">Date</th>
            <th class="c4"></th>
            <th class="c5"></th>
            <th class="c6"></th>
          </tr>
          <tr v-for="(order, index) in orders" v-bind:class="{dark: index % 2 === 0}" v-bind:key="order._id">
            <td class="dataElement">
              <span v-show="orderSelect !== order">{{order.name}}</span>
              <input class="nameInput" v-if="orderSelect === order" v-model="orderEdit.name" type="text"/>
            </td>
            <td class="dataElement">
              <span v-show="orderSelect !== order">{{order.number}}</span>
              <input class="numberInput" v-if="orderSelect === order" v-model="orderEdit.number" type="text"/>
            </td>
            <td class="dataElement">
              <span v-show="orderSelect !== order">{{order.date}}</span>
              <input class="dateInput" v-if="orderSelect === order" v-model="orderEdit.date" type="date"/>
            </td>
            <td style="width: 2em;">
              <button v-show="orderSelect === order" v-bind:class="{ fullOpacity: orderSelect === order }" @click="editOrder(order)" class="rowButton" title="Apply">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.66em" height="1.66em">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path v-bind:fill="colorBtn(order, 'Apply')" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
              </button>
            </td>
            <td style="width: 2em;">
              <button v-if="orderSelect === order" v-bind:class="{ fullOpacity: orderSelect === order }" @click="showEdit(order)" class="rowButton" title="Cancel">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.66em" height="1.66em">
                    <path v-bind:fill="colorBtn(order, 'Cancel')" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
              </button>
              <button v-else v-bind:class="{ fullOpacity: orderSelect === order }" @click="showEdit(order)" class="rowButton" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.66em" height="1.66em">
                  <path v-bind:fill="colorBtn(order, 'Edit')" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
              </button>
            </td>
            <td style="width: 2em;">
              <button v-bind:class="{ fullOpacity: orderSelect === order }" @click="confirmRemove(order)" class="rowButton" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.66em" height="1.66em">
                  <path fill="none" d="M0 0h24v24H0V0z"/>
                  <path v-bind:fill="colorBtn(order, 'Delete')" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                  <path fill="none" d="M0 0h24v24H0z"/>
                </svg>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div v-else>
    <p style="display: block; text-align:center; width: 100%;">If you would like to add work orders, please register for an account or login.</p>
    <div style="display: flex; flex-direction: column; align-items: center; margin: auto;">
      <router-link class="headLink" style="color: black;" to="/register">Register</router-link> or
      <router-link class="headLink" style="color: black;" to="/login">Login</router-link>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'user',
  data() {
    return {
      name: '',
      number: '',
      date: '',
      orderSelect: null,
      orderEdit: null,
      orders: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created: function() {
    this.getOrders();
    this.$store.dispatch("getUser");
  },
  methods: {
    showEdit(order) {
      if (this.orderSelect === null || this.orderSelect !== order) {
        this.orderSelect = order;
        this.orderEdit = JSON.parse(JSON.stringify(order));
      } else {
        this.orderSelect = null;
      }
    },
    sameOrder(order1, order2) {
      if (JSON.stringify(order1) === JSON.stringify(order2)) return true;
      else return false;
    },
    editOrder(order) {
      if (!this.sameOrder(this.orderEdit, order)) this.updateOrder(order);
      else this.showEdit(order); 
    },
    colorBtn(order, btn) {
      if (this.sameOrder(this.orderSelect, order)) {
        switch(btn) {
          case 'Apply':
            return '#28a745';
          case 'Cancel':
            return '#fd7e14';
          case 'Edit':
            return '#002E5D';
          case 'Delete':
            return '#dc3545';
        }
      }
    },
    confirmRemove(order) {
      if (confirm('Are you sure you want to remove this order from the database?')) this.removeOrder(order);
    },
    async getOrders() {
      try {
        let response = await axios.get("/api/orders");
        this.orders = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitOrder() {
      if(this.name === '' || this.number === '' || this.date === '') {
        alert("Please fill all fields!");
      } else {
        try {
          await axios.post("/api/orders", {
            name: this.name,
            number: this.number,
            date: this.date
          });
          this.name = this.number = this.date = "";
          this.getOrders();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async updateOrder(order) {
      console.log("updating on db");
      try {
        await axios.put("/api/orders/" + this.orderEdit._id, {
          name: ((this.orderEdit.name === '') ? order.name : this.orderEdit.name),
          number: ((this.orderEdit.number === '') ? order.number : this.orderEdit.number),
          date: ((this.orderEdit.date === '') ? order.date : this.orderEdit.date)
        });
        this.showEdit(order);
        this.getOrders();
      } catch (error) {
        console.log(error);
      }
    },
    async removeOrder(order) {
      try {
        await axios.delete("/api/orders/" + order._id);
        this.getOrders();
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
.userSurround {
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userContainer {
  display: flex;
  flex-direction: column;
  float: right;
  margin: 0 !important;
  align-self: flex-end;
}

.userContainer h2 {
  display:inline;
}

.logout {
  float: right;
  margin: 0 !important;
  display: flex !important;
  flex-direction: row;
  width: fit-content;
  color: darkred;
  cursor: pointer;
}

.logout h3 {
  margin: 0 .33em;
}

#but {
  fill: darkred;
}
</style>