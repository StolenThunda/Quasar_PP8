<template>
  <v-row dense>
    <v-col>
      <v-card v-for="item in info" :key="item.id">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="item.src"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="headline" v-text="item.title"></v-card-title>
            <v-card-subtitle v-text="item.subtitle"></v-card-subtitle>
            <v-card-text v-text="item.data"></v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-btn color="orange" text>Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import axios from "axios";
export default {
  name: "RandoCardItem",
  data: () => ({
    info: null
  })
  // created() {
  //   axios
  //     .get("https://baconipsum.com/api/?callback=?", {
  //       type: "meat-and-filler",
  //       "start-with-lorem": "1",
  //       paras: "1",
  //     })
  //     .then((res) => (this.info = this.buildInfo(res.data)));
  // },
  // computed: {
  //   itemURL: function () {
  //     alert(this.name);
  //     const url = `https://randomuser.me/api/portraits/women/${this.id}.jpg`;
  //     console.log(url);
  //     return url;
  //   },
  // },
  // methods: {
  //   getUrl(id) {
  //     return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  //     // console.log(url);
  //   },
  //   buildInfo(data) {
  //     const info = [];
  //     data.forEach((text, idx) => {
  //       // let text = data[0];
  //       // let idx = 1;
  //       data = {
  //         src: this.getUrl(Math.floor(Math.random() * 94) + idx),
  //         title: text.split(" ").slice(0, 3).join(" "),
  //         subtitle: text.split(" ").splice(3, 2).join(" ").toUpperCase(),
  //         data: text.split(" ").slice(3).join(" "),
  //       };
  //       data.id = data.title + "_" + idx;
  //       info.push(data);
  //     });
  //     // console.info(info);
  //     return info;
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
