<template>
  <div class="select-participants">

    <el-input v-model="participant"
              placeholder="Add a participant"
              @keyup.enter.native="addParticipant()">
      <el-button :disabled="!participant"
                 icon="el-icon-plus"
                 slot="append"
                 @click="addParticipant()">
      </el-button>
    </el-input>

    <div class="participants">
      <div v-for="(participant, index) in internalValue" :key="index">
        <el-button circle
                   class="remove-participant"
                   icon="el-icon-delete"
                   size="mini"
                   type="danger"
                   @click="removeParticipant(index)">
        </el-button>
        {{participant}}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

  @Component({
    name: SelectParticipants.tag
  })
  export class SelectParticipants extends Vue {
    static tag = 'mmSelectParticipants';

    @Prop({required: true})
    value: Array<string> | null;

    internalValue: Array<string> = [];
    participant: string | null = null;

    beforeMount(): void {
      this.onValueChanged();
    }

    @Watch('value')
    onValueChanged(): void {
      this.internalValue = this.value || [];
    }

    onInternalValueChanged(): void {
      this.$emit('input', this.internalValue);
    }

    addParticipant(): void {
      this.internalValue.push(this.participant);
      this.onInternalValueChanged();

      this.participant = null;
    }

    removeParticipant(index: number): void {
      this.$delete(this.internalValue, index);
      this.onInternalValueChanged();
    }
  }

  export default SelectParticipants;
</script>

<style lang="scss" scoped>
  .select-participants {

    .participants {
      margin-top: .5rem;
    }

    .remove-participant {
      margin-right: .5rem;
    }
  }
</style>
