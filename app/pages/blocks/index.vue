<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Web Blocks'
})
useSeoMeta({
  title: 'Web Blocks',
  description: 'Blocks page for managing web blocks.'
})
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <UiHeaderContent
      title="Web Blocks"
      subtitle="Blocks page for managing web blocks."
    />

    <UiAlert
      variant="success"
      type="tonal"
      title="Welcome to the Web Blocks Page"
      message="This is where you can manage your web blocks."
    >
      <template #content>
        <p class="subtitle-2 text-link my-2">
          Here you can <strong>create, edit, and delete</strong> web blocks to customize your website's layout and functionality.
        </p>
      </template>
      <template #actions>
        <UiButton
          variant="filled"
          color="success"
          text="Learn More"
          size="sm"
        >
          <template #icon>
            <UiIconMaterial icon-code="&#xe868;" />
          </template>
        </UiButton>
      </template>
    </UiAlert>

    <div class="row">
      <div class="col-md-12">
        <pre class="border bg-bordered-gradient p-3">
          <code>
&lt;template&gt;
  &lt;div class="container-fluid"&gt;
    &lt;!-- Header --&gt;
    &lt;UiHeaderContent
      title="Web Blocks"
      subtitle="Blocks page for managing web blocks."
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>
