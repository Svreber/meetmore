<template>
  <el-select v-model="internalValue"
             placeholder="Recurrence"
             @change="onInternalValueChanged">
    <el-option v-for="recurrence in recurrences"
               :key="recurrence.value"
               :label="recurrence.name"
               :value="recurrence.value">
    </el-option>
  </el-select>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {IDuration} from '@/core/interfaces/IDuration';

  @Component({
    name: SelectRecurrence.tag
  })
  export class SelectRecurrence extends Vue {
    static tag = 'mmSelectRecurrence';

    @Prop()
    value: number | null;

    internalValue: number | null = null;

    recurrences: Array<IDuration> = [{
      name: '1 week',
      value: 7
    }, {
      name: '2 weeks',
      value: 14
    }, {
      name: '1 month',
      value: 31
    }, {
      name: '2 months',
      value: 61
    }, {
      name: '6 months',
      value: 183
    }];

    beforeMount(): void {
      this.onValueChanged();
    }

    @Watch('value')
    onValueChanged(): void {
      this.internalValue = this.value;
    }

    onInternalValueChanged(): void {
      this.$emit('input', this.internalValue);
    }
  }

  export default SelectRecurrence;
</script>
