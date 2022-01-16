<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ mileage }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list class="el-space-station">
                  <q-item>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>

        <div class="text-h4 accent-space-station">{{ data.name }}</div>
        <div class="text-subtitle1">{{ data.plateNumber }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { VehicleEntry } from 'src/components/models'
import { defineProps } from 'vue';

const mileage = '5.6 L/100km'
defineProps({
  data: {
    type: VehicleEntry,
    required: true
  }
})

</script>
