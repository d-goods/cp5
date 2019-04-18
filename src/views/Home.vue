<template>
<div class="content">
  <div class="form">
    <div class="name">
      <h3>Name:</h3>
      <input v-model="name" placeholder="Full Name">
    </div>
    <div class="time">
      <h3>Time:<div style="display: inline; margin: 0; margin-left: .36em; color: #002E5D;" v-if="this.clockin !== '' && this.clockout !== ''">{{computedTime}} hrs</div></h3>
      <div v-if="span">
        <div class="times">
          <h3 style="display: inline;">In:</h3>
          <input type="time" v-model="clockin"/>
        </div>
        <div class="times">
          <h3 style="display: inline;">Out:</h3>
          <input type="time" v-model="clockout"/>
        </div>
      </div>
      <input v-else v-model="time">
    </div>
    <div class="crew">
      <h3>Crew:</h3>
      <select v-model="crew">
        <option v-for="crew in crews" v-bind:key="crew">{{crew}}</option>
      </select>
    </div>
    <div class="order">
      <h3>Order Number:<span style="margin: 0; margin-left: .36em; color: #002E5D; min-width: 8em;" v-if="order !== null">{{order.number}}</span></h3>
      <select v-if="this.orders.length > 0" v-model="order">
        <option v-for="order in orders" v-bind:value="order" v-bind:key="order._id">{{order.name}} ({{order.date}})</option>
      </select>
      <h3 v-else>n/a - no orders available</h3>
    </div>
    <div class="submit">
      <button @click="sendEmail">Send Time</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      name: '',
      span: true,
      clockin: '',
      clockout: '',
      time: 0.0,
      crew: 'Video',
      crews: [
        'Video',
        'Audio',
        'Lighting',
        'Delivery'
      ],
      order: null,
      orders: []
    }
  },
  created: function() {
    this.getOrders();
  },
  computed: {
    computedTime: function() {
      if(this.clockin !== '' && this.clockout !== '') {
        let hours, minutes, total = 0;
        let in_strs = this.clockin.split(":");
        let out_strs = this.clockout.split(":");
        let in_ints = in_strs.map(x => parseInt(x));
        let out_ints = out_strs.map(y => parseInt(y));
        let in_hour = in_ints[0];
        let out_hour = out_ints[0];
        let in_mins = in_ints[1];
        let out_mins = out_ints[1];
        if(out_hour < in_hour) {
          hours = (24 - in_hour) + out_hour;
        } else {
          hours = out_hour - in_hour;
        }
        hours -= 1;
        minutes = (60 - in_mins) + out_mins;
        total = hours + (minutes / 60);
        return total.toFixed(2);
      }
      return null;
    }
  },
  methods: {
    select_num(order) {
      this.order = order;
    },
    async getOrders() {
      try {
        const response = await axios.get("/api/orders/all");
        this.orders = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendEmail() {
      if(this.name === '' || this.clockin === '' || this.clockout === '' || this.order === null) {
        alert("Please fill all fields!");
      } else {
        try {
          var body = 'Name: ' + this.name + '<br>' +
            'Work Order: <b>' + this.order.number + '</b><br>' +
            'Crew: ' + this.crew + '<br>' +
            'Time Worked: ' + this.computedTime;
          await axios.post('/api/send-email', {
            subject: "Time for " + this.order.name,
            message: body
          });
          alert("Email sent!");
          this.clockin = this.clockout = '';
          this.order = null;
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
}
</script>
