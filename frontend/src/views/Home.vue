<template>
  <div class="home">
    <el-button size="large"
               type="primary"
               @click="goToEventCreation">
      Create an event
    </el-button>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {RouterService} from '@/core/services/RouterService';

  @Component()
  export class Home extends Vue {

    async goToEventCreation(): void {
      RouterService.goToEventCreation();
    }
  }

  export default Home;
</script>
