<template>
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <header class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8">
        <div>
          <a class="flex items-center gap-2 font-semibold" href="/">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
          </a>
        </div>
        <nav class="flex flex-col ml-auto space-x-4 items-center h-10 sm:space-x-6">
          <div class="space-x-4 mt-2 font-medium">
            <RouterLink to="/nueva-ciudad" class="hover:text-blue-600 transition-colors"> Nueva ciudad </RouterLink>
            <RouterLink to="/nuevo-atleta" class="hover:text-blue-600 transition-colors"> Nuevo atleta </RouterLink>
            <RouterLink to="/ciudades" class="hover:text-blue-600 transition-colors"> Ciudades registradas</RouterLink>
            <RouterLink to="/atletas" class="hover:text-blue-600 transition-colors"> Podio atletas</RouterLink>
          </div>
        </nav>
      </header>
      <!-- Fin Header -->
  
      <!-- Main -->
      <main class="flex-1 flex items-center justify-center">
        <RouterView />
      </main>
      <!-- Fin Main -->
  
      <!-- Footer -->
      <footer class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8">
        <p class="flex-1 text-sm text-gray-500 text-center">
          © {{ new Date().getFullYear() }} - Aguirre Leandro. Legajo: 17512 
        </p>
      </footer>
      <!-- Fin Footer -->
    </div>
  </template>

<script setup>
// No necesitamos importar RouterLink porque Vue lo importa automáticamente
</script>
  