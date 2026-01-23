<script setup>
import {useRouter} from "vue-router";
import {Topbar, Navigation, Footer, Logo, CurrPath} from "@/components";
import {AuthButtons} from "./components";
import {navItems} from "./config/navigation.config.js";

const router = useRouter();

function onAuthButtonAction(event){
  switch(event.action){
    case "signIn" : router.push("/auth/signin");
    break;
    case "signUp" : router.push("/auth/signUp");
    break;
  }
}

</script>


<template>
  <div class="topbar-container">
    <header>
      <Topbar>
        <template #topbarLeft>
          <div class="nav-primary">
            <Navigation
              :navItems="navItems"
            />

            <Logo />
          </div>
        </template>

        <template #topbarRight>
          <AuthButtons
            @authButton:action="onAuthButtonAction"
          />
        </template>
      </Topbar>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <Footer
      />
    </footer>
  </div>
</template>


<style scoped lang="scss">
@use "@/styles/media" as media;
@use "@/styles/breakpoints" as bp;

.topbar-container {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
}

header {
  height: var(--topbar-height);
}

footer {
  height: var(--footer-height);
}

.nav-primary {
  display: flex;
  align-items: center;

  @include media.up(bp.$bp-md){
    flex-direction: row-reverse;
    gap: var(--space-md);
  }
}
</style>
