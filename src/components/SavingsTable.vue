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
              {{ bucket.amount + bucket.changes }}
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
                :suffix="'(' + bucket.ratioValue + ')'"
                type="number"
                @change="
                  if (!$event) {
                    bucket.add = 0;
                  }
                "
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
                type="number"
                @change="
                  if (!$event) {
                    bucket.minus = 0;
                  }
                "
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
          @change="
            if (!$event) {
              income = 0;
            }
          "
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../store";

export default {
  name: "SavingsTable",

  data() {
    return {
      income: 0,
      savings: {
        necessity: {
          icon: "mdi-calendar-check",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.6,
          ratioValue: 0,
        },
        emergency: {
          icon: "mdi-bug",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
          ratioValue: 0,
        },
        investment: {
          icon: "mdi-bank",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
          ratioValue: 0,
        },
        learning: {
          icon: "mdi-microsoft-visual-studio-code",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
          ratioValue: 0,
        },
        fun: {
          icon: "mdi-cards-spade",
          amount: 0,
          add: 0,
          minus: 0,
          changes: 0,
          ratio: 0.1,
          ratioValue: 0,
        },
      },
    };
  },
  created() {
    for (const key in this.savings) {
      const bucket = this.savings[key];
      this.$watch(
        () => bucket.add,
        () => this.onChange(bucket),
        { deep: true }
      );
      this.$watch(
        () => bucket.minus,
        () => this.onChange(bucket),
        { deep: true }
      );
    }
    this.$watch("income", this.onIncomeChange, { deep: true });
  },
  watch: {
    isAuth: function(val) {
      if (val) {
        store.dispatch("bindSavings");
        this.getSavings();
      } else {
        this.resetSavings();
        this.resetChanges();
      }
    },
    getNewSavings: {
      handler(val) {
        console.log("watch getnewsavings", val);
        this.getSavings();
      },
      deep: true,
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
    resetChanges() {
      for (const key in this.savings) {
        const bucket = this.savings[key];
        bucket.add = 0;
        bucket.minus = 0;
        bucket.changes = 0;
      }
      this.income = 0;
    },
    resetSavings() {
      for (const key in this.savings) {
        const bucket = this.savings[key];
        bucket.amount = 0;
      }
    },
    getSavings() {
      if (this.isAuth) {
        const savings = this.getNewSavings;
        console.log("methods get savings", savings);
        for (const key in savings) {
          this.savings[key].amount = savings[key];
        }
      }
    },
    onChange(bucket) {
      this.updateChanges(bucket);
    },
    onIncomeChange() {
      if (!this.income) {
        this.income = 0;
      }

      const remainder = this.income % 10;
      const maxInt = this.income - remainder;

      for (const key in this.savings) {
        const bucket = this.savings[key];

        bucket.ratioValue = maxInt * bucket.ratio;
        if (key == "necessity") {
          bucket.ratioValue += remainder;
        }
        this.updateChanges(bucket);
      }
    },
    updateChanges(bucket) {
      bucket.changes = bucket.add - bucket.minus + bucket.ratioValue;
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
      this.resetChanges();
    },
  },
};
</script>
