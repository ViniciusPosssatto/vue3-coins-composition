<template>

    <ListQuotes :quotes="quotes" :listenCoinCodes="listenCoinCodes" @unlisten="onUnlisten" />
    <div class="mt-2 text-right">
        <cite class="text-small text">
            Atualizará novamente em <b>{{nextUpdateTime}} segundos</b>
        </cite>
    </div>

</template>

<script>
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue';
import ListQuotes from './ListQuotes.vue';
import api from '@/services/api'

export default {
    components: { ListQuotes },
    props: {
        listenCoinCodes: { type: Array, required: true },
    },
    emits: ['unlisten'],
    setup(props, {emit}) {
        const quotes = ref({});
        const nextUpdateTime = ref(15);
        const interval = ref(null);

        const methods = reactive({
            onUnlisten(code) {
                emit('unlisten', code)
            },
            restartInterval() {
                clearInterval(interval.value)
                nextUpdateTime.value = 15
                interval.value = setInterval(() => {
                    nextUpdateTime.value -= 1
                    if (nextUpdateTime.value === 0) {
                        nextUpdateTime.value = 15
                        this.refresh()
                    } 
                }, 1000)
            },
            async refresh() {
                const {data} = await api.listen(props.listenCoinCodes)
                quotes.value = data
            }
        });

        onMounted(() => {
            methods.refresh()
            methods.restartInterval()
        });

        watch(props, () => {
            methods.refresh()
            methods.restartInterval()
        });

        onUnmounted(() => {
            clearInterval(interval.value)
        });

        return { quotes, nextUpdateTime, interval, ...toRefs(methods) };
    }
}
</script>