<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <vee-form @submit="onSubmit" v-slot="{ errors }">
        <ion-grid fixed>
          <ion-row>
            <ion-col>
              <ion-label>From</ion-label>
              <vee-field name="from" v-slot="{ handleChange, value }" :rules="isRequired">
                <ion-searchbar name="from" placeholder="MOW" :value="value" @input="handleChange" />
              </vee-field>
              <vee-error-message name="from" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-label>To</ion-label>
              <vee-field name="to" v-slot="{ handleChange, value }" :rules="isRequired">
                <ion-searchbar name="to" placeholder="LED" :value="value" @input="handleChange" />
              </vee-field>
              <vee-error-message name="to" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-label>Date</ion-label>
              <vee-field name="date" v-slot="{ handleChange, value }">
                <ion-datetime name="date" presentation="date" :value="value" @input="handleChange" />
              </vee-field>
              <vee-error-message name="date" />
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col><ion-button type="submit">Search</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </vee-form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const result = ref();

const onSubmit = async (values: any) => {
  result.value = await useFetch(`${config.public.apiBase}/search`, {
    method: 'post',
    body: new URLSearchParams(values)
  });
};

const isRequired = (value: string) => {
  if (value && value.trim()) {
    return true;
  }

  return 'This is required';
};
</script>
