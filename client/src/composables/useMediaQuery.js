import { ref, onMounted, onUnmounted } from "vue";

export default function useMediaQuery(query){
    const matches = ref(false);

    let mediaQuery;
    let mediaQueryHandler;

    onMounted(() => {
        mediaQuery = window.matchMedia(query);

        matches.value = mediaQuery.matches;

        mediaQueryHandler = (event) => {
            matches.value = event.matches;
        };

        mediaQuery.addEventListener("change", mediaQueryHandler);
    });

    onUnmounted(() => {
        if(mediaQuery && mediaQueryHandler){
            mediaQuery.removeEventListener("change", mediaQueryHandler);
        }
    });

    return {
        matches
    };
}
