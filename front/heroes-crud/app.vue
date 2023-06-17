
<script >
export default {
  data: () => ({
    data: '',
    apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6MSwibWV0YWRhdGEiOm51bGwsIm5hbWUiOiJyb290IiwidXNlcm5hbWUiOiJyb290In0sImV4cCI6MTY4NzA0MDEwMywibmJmIjoxNjg3MDE4NTAzfQ.n0bmEVhKb65wTrMS0dI_33h_qN20EzC9JjRTyUYLJOQ"

  }),
  methods: {
    async getData() {
      this.data = await useFetch('http://127.0.0.1:8005/prest/public/heroes?_select=Rank,', { headers: { Authorization: `Bearer ${this.apiToken}` } })
    }
  }
}
</script>
<template>
  <div>
    <button @click="getData">Count is: {{ data }}</button>
  </div>
</template>
