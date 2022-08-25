<template>
  <table class="table bg-dark">
    <thead>
        <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Máximo</th>
            <th>Mínimo</th>
            <th>Variação</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(quote, key) in quotes" :key="key">
            <td v-text="key"></td>
            <td v-text="quote.name"></td>
            <td v-text="quote.high"></td>
            <td v-text="quote.low"></td>
            <td>
                <span 
                    class="label label-rounded text-small" 
                    :class="{ 'label-error': quote.pctChange < 0, 'label-success': quote.pctChange > 0}"
                >
                {{ quote.pctChange }} %
                </span>
            </td>
            <td>
                <a 
                v-if="!listenCoinCodes.includes(key)"
                href="#"
                class="btn btn-primary btn-sm tooltip tooltip-left"
                data-tooltip="Seguir"
                @click="$emit('listen', key)"
                >
                    <i class="icon icon-plus"></i>
                </a>
                <a
                    v-else
                    class="btn btn-error btn-sm tooltip tooltip-left"
                    data-tooltip="Remover"
                    @click="$emit('unlisten', key)"
                >
                    <i class="icon icon-minus"></i>
                </a>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        props: { 
            quotes: { type: Object, required: true },
            listenCoinCodes: { type: Array, required: true } 
        },
        emits: ['listen', 'unlisten']
    }
</script>