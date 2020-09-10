<template>
  <div class="content">
    <h2>专辑详情</h2>
    <div class="album_page" :style="{height: total>rn?'563px':'600px'}">
      <div class="album">
        <img class="album_img" src="http://img2.kuwo.cn/star/albumcover/300/56/26/3424581263.jpg" />
        <div class="album_info">
          <p class="album_name">{{singerInfo.album}}</p>
          <p>
            <span class="album_artist" @click="toSinger(singerInfo.artistid)">{{singerInfo.artist}}</span>
          </p>
          <p>
            <span class="lang">语种 : {{ singerInfo.lang }}</span>
            <span class="album_time">发行时间 : {{ singerInfo.releaseDate }}</span>
          </p>
          <p class="album_i">
            专辑简介
            <span class="spread" v-if="isShowSpread" @click="spreadClick">{{ spread }}</span>
          </p>
          <p class="album_intro" :style="height">{{ singerInfo.albuminfo }}</p>
        </div>
      </div>
      <header-item />
      <song-item
        v-for="(item, index) in singerInfo.musicList"
        :key="index"
        :num="index"
        :data="item"
      />
    </div>
    <div>
      <pagination :total="total" :pn="pn" :rn="rn" :eventName="eventName" />
    </div>
  </div>
</template>

<script>
import HeaderItem from "components/item/HeaderItem.vue";
import SongItem from "components/item/SongItem.vue";
import Pagination from "components/item/Pagination.vue";
import { getAlbum } from "@/network/music";

export default {
  name: "album-view",
  components: {
    HeaderItem,
    SongItem,
    Pagination,
  },
  data() {
    return {
      singerInfo: {},
      aid: 0,
      total: 0,
      pn: 0,
      rn: 30,
      eventName: "AlbumPage",
      spread: "展开",
      height: "height: 33px",
    };
  },
  created() {
    this.$bus.$on(this.eventName, (pn) => {
      this.changeAlbum(pn);
    });
  },
  activated() {
    if (this.aid != this.$route.params.aid) {
      this.aid = this.$route.params.aid;
      this.pn = 0;
      this.changeAlbum(1);
    } else {
      this.$store.commit("changeSongList", this.singerInfo.musicList);
    }
  },
  computed: {
    isShowSpread() {
      if (this.singerInfo.albuminfo != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    changeAlbum(pn) {
      if (pn != this.pn) {
        getAlbum(this.aid, pn).then((res) => {
          this.singerInfo = res.data.data;
          this.total = res.data.total;
          this.$store.commit("changeSongList", this.singerInfo.musicList);
          this.pn = pn;
        });
      }
    },
    spreadClick() {
      if (this.spread === "展开") {
        this.spread = "收起";
        this.height = "height: auto";
      } else {
        this.spread = "展开";
        this.height = "height: 33px";
      }
    },
    toSinger(aid) {
      this.$router.push({ name: "Singer", params: { aid } });
    },
  },
};
</script>

<style scoped>
.album {
  display: flex;
}
.album_page {
  overflow-y: auto;
  height: 600px;
  width: 880px;
}
.album_img {
  width: 200px;
  height: 200px;
  margin: 10px;
}
.album_info {
  width: 630px;
  height: auto;
  margin-right: 10px;
}
.album_name {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 0;
  margin-top: 10px;
}
.album_artist {
  font-size: 20px;
  cursor: pointer;
}
.lang {
  margin-right: 40px;
}
.album_intro {
  font-size: 18px;
  white-space: pre-wrap;
  margin-top: 0;
}
.album_i {
  position: relative;
  font-weight: 700;
  font-size: 24px;
  margin: 2px 0;
}
.spread {
  position: absolute;
  right: 0;
  top: 0;
  color: #296294;
  cursor: pointer;
}
</style>
