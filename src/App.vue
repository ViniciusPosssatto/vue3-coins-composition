<template>
    <div class="container grid-lg my-2 py-2 header">
        <div class="card mb-2 header" v-if="listenCoinCodes.length > 0">
            <div class="card-header">
                <div class="h4 dark">
                    <h2 class="text">Moedas selecionadas</h2>
                </div>
                <div class="card-body">
                <WatchListQuotes 
                    :listenCoinCodes="listenCoinCodes"
                    @unlisten="onUnlisten"
                />
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="h4">
                    <h2 class="text">Todas as moedas</h2>
                </div>
                <div class="card-body">
                    <ListQuotes 
                        :quotes="quotes" 
                        :listenCoinCodes="listenCoinCodes" 
                        @listen="onListen"
                        @unlisten="onUnlisten"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import api from '@/services/api'
import ListQuotes from './components/ListQuotes.vue'
import WatchListQuotes from './components/WatchListQuotes.vue'

export default {
    name: 'App',
    components: { ListQuotes, WatchListQuotes },
    setup() {
        
        const data = reactive({
            quotes: {},
            listenCoinCodes: []
        })

        onMounted(async() => {
            const response = await api.all()
            data.quotes = response.data
        })

        function onListen(code) {
            data.listenCoinCodes.push(code)
        }
        function onUnlisten(code) {
            data.listenCoinCodes = data.listenCoinCodes.filter(key => key !== code)
        }

        return { ...toRefs(data), onListen, onUnlisten }
    }
}
</script>


<style>
.header {
    background-color: rgb(3, 3, 3);
}
.text {
    color: rgb(255, 255, 255);
}
.card-header {
    background-color: rgb(63, 63, 63);
}

</style>