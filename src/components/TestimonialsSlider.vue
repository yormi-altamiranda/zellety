<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const testimonials = [
  {
    type: 'quote',
    name: 'Carlos Mendoza',
    role: 'CEO · FinTech Andina',
    avatar: 'https://picsum.photos/seed/av1/80/80',
    quote: 'Zellety transformó nuestra plataforma por completo. El equipo entendió nuestras necesidades desde el día uno y entregó un producto que superó todas las expectativas.',
  },
  {
    type: 'quote',
    name: 'Valeria Torres',
    role: 'CPO · Novatech MX',
    avatar: 'https://picsum.photos/seed/av2/80/80',
    quote: 'La calidad del diseño UX/UI fue impresionante. Cada pantalla está pensada con detalle. Nuestros usuarios notaron el cambio de inmediato y el NPS subió 40 puntos.',
  },
  {
    type: 'photo',
    name: 'Diego Ramírez',
    role: 'CTO · SmartHome CO',
    photo: 'https://picsum.photos/seed/ph1/400/520',
  },
  {
    type: 'quote',
    name: 'Sofía Gutiérrez',
    role: 'Founder · EduLab AR',
    avatar: 'https://picsum.photos/seed/av4/80/80',
    quote: 'No solo construyeron lo que pedimos, sino que propusieron mejoras que ni habíamos contemplado. El resultado es un producto del que estamos muy orgullosos.',
  },
  {
    type: 'photo',
    name: 'Andrés Peña',
    role: 'Head of Product · TeamFlow',
    photo: 'https://picsum.photos/seed/ph2/400/520',
  },
  {
    type: 'quote',
    name: 'Mariana López',
    role: 'Marketing Director · ModaLatam',
    avatar: 'https://picsum.photos/seed/av6/80/80',
    quote: 'Nuestra tienda e-commerce pasó de ser un sitio básico a una plataforma de alto rendimiento. Las ventas online aumentaron un 80% en tres meses.',
  },
  {
    type: 'photo',
    name: 'Ricardo Silva',
    role: 'CEO · Inversa',
    photo: 'https://picsum.photos/seed/ph3/400/520',
  },
]
</script>

<template>
  <div class="testimonials-swiper w-full overflow-hidden">
    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="'auto'"
      :space-between="12"
      :loop="true"
      :autoplay="{ delay: 3500, disableOnInteraction: false }"
      :grab-cursor="true"
      style="padding: 0 clamp(1rem, 4vw, 2rem); overflow: visible;"
    >
      <SwiperSlide
        v-for="(t, i) in testimonials"
        :key="i"
        style="width: 300px; height: 420px;"
      >
        <!-- QUOTE CARD -->
        <div
          v-if="t.type === 'quote'"
          style="
            height: 100%;
            background: #f5f5f5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2rem;
          "
        >
          <!-- Quote icon -->
          <div>
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style="margin-bottom: 1.25rem; opacity: 0.25;">
              <path d="M0 22V13.2C0 9.6 0.933333 6.6 2.8 4.2C4.66667 1.8 7.2 0.266667 10.4 0L11.2 1.6C9.06667 2.13333 7.4 3.2 6.2 4.8C5 6.4 4.4 8.13333 4.4 10H8.8V22H0ZM16.8 22V13.2C16.8 9.6 17.7333 6.6 19.6 4.2C21.4667 1.8 24 0.266667 27.2 0L28 1.6C25.8667 2.13333 24.2 3.2 23 4.8C21.8 6.4 21.2 8.13333 21.2 10H25.6V22H16.8Z" fill="#191919"/>
            </svg>

            <p style="font-size: 0.95rem; line-height: 1.7; color: #191919; font-weight: 500;">
              {{ t.quote }}
            </p>
          </div>

          <!-- Author -->
          <div style="display: flex; align-items: center; gap: 0.75rem; border-top: 1px solid #e5e5e5; padding-top: 1.25rem; margin-top: 1.5rem;">
            <img
              :src="t.avatar"
              :alt="t.name"
              style="width: 40px; height: 40px; object-fit: cover; flex-shrink: 0;"
            />
            <div>
              <p style="font-size: 0.85rem; font-weight: 600; color: #191919; line-height: 1.3;">{{ t.name }}</p>
              <p style="font-size: 0.75rem; color: #8a8a8a; margin-top: 2px;">{{ t.role }}</p>
            </div>
          </div>
        </div>

        <!-- PHOTO CARD -->
        <div
          v-else
          style="height: 100%; position: relative; overflow: hidden;"
        >
          <img
            :src="t.photo"
            :alt="t.name"
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
          <!-- Gradient overlay -->
          <div style="
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%);
          "></div>
          <!-- Author overlay -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
            <img
              :src="`https://picsum.photos/seed/${t.name}/40/40`"
              :alt="t.name"
              style="width: 36px; height: 36px; object-fit: cover; flex-shrink: 0;"
            />
            <div>
              <p style="font-size: 0.85rem; font-weight: 600; color: #ffffff; line-height: 1.3;">{{ t.name }}</p>
              <p style="font-size: 0.72rem; color: rgba(255,255,255,0.65); margin-top: 1px;">{{ t.role }}</p>
            </div>
          </div>
        </div>

      </SwiperSlide>
    </Swiper>
  </div>
</template>
