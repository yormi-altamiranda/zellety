<script setup lang="ts">
import { ref, reactive } from 'vue'

type Status = 'idle' | 'loading' | 'success' | 'error'

const status = ref<Status>('idle')

const form = reactive({
  name: '',
  email: '',
  service: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  service: '',
  message: '',
})

function validate(): boolean {
  errors.name    = form.name.trim()    ? '' : 'Tu nombre es requerido.'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Email inválido.'
  errors.service = form.service        ? '' : 'Selecciona un servicio.'
  errors.message = form.message.trim() ? '' : 'Escribe tu mensaje.'
  return !Object.values(errors).some(Boolean)
}

async function handleSubmit(e: Event) {
  if (!validate()) return

  status.value = 'loading'
  const formEl = e.target as HTMLFormElement

  try {
    const data = new FormData(formEl)
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
    status.value = res.ok ? 'success' : 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <!-- Success state -->
  <div v-if="status === 'success'" class="text-center py-12">
    <div class="w-16 h-16 bg-[var(--z-lime-400)] rounded-full flex items-center justify-center mx-auto mb-6">
      <span class="text-[var(--z-black)] text-2xl font-bold">✓</span>
    </div>
    <h3 class="font-display font-bold text-[var(--z-white)] text-2xl mb-3">¡Mensaje enviado!</h3>
    <p class="font-body text-[var(--z-slate-300)]">Te contactaremos pronto.</p>
  </div>

  <!-- Form -->
  <form
    v-else
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-5"
    novalidate
  >
    <input type="hidden" name="form-name" value="contact" />
    <p class="hidden"><input name="bot-field" /></p>

    <!-- Name + Email row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1.5">
        <label for="contact-name" class="label-mono text-[var(--z-slate-300)]">Nombre</label>
        <input
          id="contact-name"
          v-model="form.name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          autocomplete="name"
          class="contact-input"
          :class="{ 'border-[var(--z-error)]!': errors.name }"
        />
        <span v-if="errors.name" class="text-[var(--z-error)] text-xs">{{ errors.name }}</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="contact-email" class="label-mono text-[var(--z-slate-300)]">Email</label>
        <input
          id="contact-email"
          v-model="form.email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autocomplete="email"
          class="contact-input"
          :class="{ 'border-[var(--z-error)]!': errors.email }"
        />
        <span v-if="errors.email" class="text-[var(--z-error)] text-xs">{{ errors.email }}</span>
      </div>
    </div>

    <!-- Service -->
    <div class="flex flex-col gap-1.5">
      <label for="contact-service" class="label-mono text-[var(--z-slate-300)]">Servicio</label>
      <select
        id="contact-service"
        v-model="form.service"
        name="service"
        class="contact-input"
        :class="{ 'border-[var(--z-error)]!': errors.service }"
      >
        <option value="" disabled>¿En qué podemos ayudarte?</option>
        <option value="web_app">Web App</option>
        <option value="mobile">App Móvil</option>
        <option value="iot">IoT / Domótica</option>
        <option value="ux_ui">UX/UI Design</option>
        <option value="saas">SaaS</option>
        <option value="other">Otro</option>
      </select>
      <span v-if="errors.service" class="text-[var(--z-error)] text-xs">{{ errors.service }}</span>
    </div>

    <!-- Message -->
    <div class="flex flex-col gap-1.5">
      <label for="contact-message" class="label-mono text-[var(--z-slate-300)]">Mensaje</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        rows="5"
        placeholder="Cuéntanos sobre tu proyecto..."
        class="contact-input resize-none"
        :class="{ 'border-[var(--z-error)]!': errors.message }"
      ></textarea>
      <span v-if="errors.message" class="text-[var(--z-error)] text-xs">{{ errors.message }}</span>
    </div>

    <!-- Error general -->
    <p v-if="status === 'error'" class="text-[var(--z-error)] text-sm">
      Hubo un error al enviar. Intenta de nuevo.
    </p>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="status === 'loading'"
      class="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span v-if="status === 'loading'">Enviando...</span>
      <span v-else>Enviar mensaje →</span>
    </button>
  </form>
</template>

<style>
.contact-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--z-midnight-950);
  border: 1px solid var(--z-midnight-800);
  border-radius: var(--border-radius-md);
  color: var(--z-white);
  font-family: var(--font-body);
  font-size: 0.875rem;
  transition: border-color 0.2s;
}
.contact-input::placeholder {
  color: var(--z-slate-500);
}
.contact-input:focus {
  outline: none;
  border-color: var(--z-lime-400);
}
.contact-input option {
  background: var(--z-midnight-900);
}
</style>
