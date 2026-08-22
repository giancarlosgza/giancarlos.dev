<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Web Block - Create'
})
useSeoMeta({
  title: 'Web Block - Create',
  description: 'Web Block for add/create actions.'
})

/** Composables */
const router = useRouter()
</script>

<template>
  <div class="container">
    <!-- Header -->
    <UiHeaderContent
      title="Web Block: Create"
      subtitle="Page for adding new documents or items."
      back-button back-button-label="Regresar"
      @click="router.back()"
    />

    <!-- Content -->
    <div class="row justify-content-center mt-section">
      <div class="col-md-8">
        <UiCard variant="outline" class="card-pane">
          <template #body>
            <form
              action=""
              class="d-grid grid-repeat-cols-md-2 gap-3"
            >
              <UiInputText id="name-input" label="Nombre" placeholder="Ingrese el nombre" class="grid-span-col-md-2" />
              <UiInputText id="email-input" label="Correo Electrónico" placeholder="Ingrese el correo electrónico" />
              <UiInputPhoneNumber id="phone-input" label="Teléfono" placeholder="Ingrese el teléfono" />
              <UiInputText id="address-input" label="Dirección" placeholder="Ingrese la dirección" />
              <UiInputText id="city-input" label="Ciudad" placeholder="Ingrese la ciudad" />
              <UiInputText id="country-input" label="País" placeholder="Ingrese el país" />
              <UiInputSelect
                id="gender-select"
                label="Género"
                option-value="value"
                option-label="label"
                placeholder="Seleccione el género"
                :options="[
                  { label: 'Hombre', value: 'male' },
                  { label: 'Mujer', value: 'female' },
                  { label: 'Otro', value: 'other' },
                ]"
              />
              <UiInputCheck
                id="active-check"
                label="Activo"
                type="checkbox"
              />

              <div class="grid-span-col-md-2">
                <UiButtonGroup class="justify-content-end">
                  <UiButton
                    variant="text"
                    text="Cancelar"
                  />
                  <UiButton
                    type="submit"
                    variant="gradient"
                    color="primary"
                    text="Guardar"
                  />
                </UiButtonGroup>
              </div>
            </form>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>
