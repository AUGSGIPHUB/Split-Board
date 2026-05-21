<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4">About Us</h1>
        <p class="text-h6 text-grey-darken-1">
          We don't just sell keyboards — we build typing experiences.
        </p>
        <v-divider class="my-6"></v-divider>
      </v-col>
    </v-row>

    <v-row class="my-12" align="center">
      <v-col cols="12" md="6">
        <v-img
          src="https://cdn.thewirecutter.com/wp-content/media/2025/12/BEST-COMPACT-MECHANICAL-KEYBOARDS-08547-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp"
          rounded="lg"
          elevation="4"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="text-h4 mb-4">Our Story</h2>
        <p class="text-body-1 mb-4">
          Founded in 2023 by a group of mechanical keyboard enthusiasts, we set
          out to solve a simple problem: finding the perfect keyboard shouldn't
          be a hassle. What started as a small community project has grown into
          a trusted shop for split, ergonomic, and custom keyboards.
        </p>
        <p class="text-body-1">
          Today, we work directly with designers and manufacturers to bring you
          exclusive models, from the Corne to the Lily58, all tested and tuned
          by people who type 10+ hours a day.
        </p>
      </v-col>
    </v-row>

    <v-row class="my-12" align="center" direction="row-reverse">
      <v-col cols="12" md="6">
        <v-img
          src="https://tzovar.as/assets/images/2025-05-22-keyboard.jpg"
          rounded="lg"
          elevation="4"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="text-h4 mb-4">Our Mission</h2>
        <p class="text-body-1 mb-4">
          To make ergonomic typing accessible, enjoyable, and stylish. We
          believe that a good keyboard is not a luxury — it's a tool that should
          reduce pain, boost productivity, and even spark joy.
        </p>
        <v-icon icon="mdi-heart" color="red" size="small"></v-icon>
        <span class="ml-2">
          Every order supports open-source keyboard projects.</span
        >
      </v-col>
    </v-row>

    <v-container class="my-12">
      <h2 class="text-h3 text-center mb-8">Why We're Different</h2>
      <v-row>
        <v-col
          v-for="feature in features"
          :key="feature.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card variant="flat" class="text-center pa-4" elevation="0">
            <v-icon
              :icon="feature.icon"
              size="40"
              color="primary"
              class="mb-3"
            ></v-icon>
            <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
            <p class="text-caption text-grey">{{ feature.text }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-12">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-sheet color="grey-lighten-4" rounded="xl" class="pa-8">
            <h2 class="text-h4 mb-2">Contact Us</h2>
            <p class="text-body-1 mb-4">
              Have questions about a product or need help choosing?
            </p>
            <a href="mailto:SplitKey@gmail.com">
              <v-btn color="primary" size="large" prepend-icon="mdi-email">
                SplitKey@gmail.com
              </v-btn>
            </a>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
const features = [
  {
    icon: "mdi-hand-peace",
    title: "Ergonomic Experts",
    text: "Every keyboard is tested by people with RSI and wrist pain.",
  },
  {
    icon: "mdi-puzzle",
    title: "DIY Friendly",
    text: "Hot-swap PCBs, open-source cases, and detailed build guides.",
  },
  {
    icon: "mdi-earth",
    title: "Global Community",
    text: "We ship worldwide and support local meetups.",
  },
  {
    icon: "mdi-recycle",
    title: "Eco-Conscious",
    text: "Minimal plastic packaging and carbon-neutral shipping.",
  },
];
</script>
