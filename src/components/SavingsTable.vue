<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">
              项目
            </th>
            <th class="text-left">
              存款
            </th>
            <th class="text-left">
              收入
            </th>
            <th class="text-left">
              支出
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bucket, key) in savings" :key="key">
            <td>
              <v-icon>{{ bucket.icon }}</v-icon>
            </td>
            <td>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</td>
            <td>
              $
              {{ parseInt(bucket.amount) + parseInt(bucket.changes) }}
            </td>
            <td>
              <v-text-field
                flat
                dense
                v-model="bucket.add"
                label="Solo"
                hide-details
                solo
                :id="key + '-add'"
                prefix="$"
                :suffix="'(' + income * bucket.ratio + ')'"
                type="number"
                @blur="onValueChange($event)"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                flat
                dense
                :id="key + '-minus'"
                v-model="bucket.minus"
                label="Solo"
                hide-details
                solo
                prefix="$"
                @blur="onValueChange($event)"
                type="number"
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row class="d-flex flex-row-reverse">
      <v-col cols="auto" align-self="end">
        <v-btn text elevation="2" @click="updateSavings">Save</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-text-field
          flat
          v-model="income"
          label="Income"
          hide-details
          prefix="$"
          type="number"
          @change="onIncomeChange"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";
// TODO: Rounding issues, if have devimal, give to necessity
export default {
  name: "SavingsTable",

  data() {
    return {
      icon: ["mdi-account"],
      income: 0,
      savings: {
        necessity: {
          icon: "mdi-calendar-check",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.6,
        },
        emergency: {
          icon: "mdi-bug",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
        },
        investment: {
          icon: "mdi-bank",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
        },
        learning: {
          icon: "mdi-microsoft-visual-studio-code",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
        },
        fun: {
          icon: "mdi-cards-spade",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
        },
      },
    };
  },
  watch: {
    isAuth: function(val) {
      if (val) {
        this.getSavings();
      }
    },
  },
  computed: {
    isAuth() {
      return store.getters.isLoggedIn;
    },
    getNewSavings() {
      return store.getters.getUserSavings;
    },
  },
  methods: {
    async getSavings() {
      if (this.isAuth) {
        const savings = await this.getNewSavings;
        for (const key in savings) {
          this.savings[key].amount = savings[key];
        }
      }
    },
    onValueChange(event) {
      const value = parseInt(event.srcElement._value);
      let id = event.srcElement.id;
      const action = id.split("-")[1];
      id = id.split("-")[0];
      const bucket = this.savings[id];
      if (action == "add" && value != bucket.add) {
        bucket.add = value;
        if (isNaN(bucket.add)) {
          bucket.add = 0;
        } else {
          bucket.changes += parseInt(value);
        }
      } else if (action == "minus" && value != bucket.minus) {
        bucket.minus = value;
        if (isNaN(bucket.minus)) {
          bucket.minus = 0;
        } else {
          bucket.changes -= parseInt(value);
        }
      }
      if (isNaN(bucket.changes)) {
        bucket.changes = 0;
      }
      this.updateChanges(bucket);
    },
    onIncomeChange() {
      if (!this.income) {
        this.income = 0;
      }

      for (const key in this.savings) {
        const bucket = this.savings[key];
        this.updateChanges(bucket);
      }
    },
    updateChanges(bucket) {
      bucket.changes = bucket.add - bucket.minus + this.income * bucket.ratio;
    },
    updateSavings() {
      const updatedSavings = {};
      for (const key in this.savings) {
        const bucket = this.savings[key];
        this.updateChanges(bucket);
        updatedSavings[key] = bucket.amount + bucket.changes;
      }

      store.commit("updateSavings", updatedSavings);
      this.getSavings();
    },
  },
};
</script>
