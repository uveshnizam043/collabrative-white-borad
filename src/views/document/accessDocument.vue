<template>
  <div>
    <spinner />
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam veritatis harum esse laudantium
    dolor impedit nemo repellat doloremque. Architecto magnam dolorem ullam placeat excepturi enim
    fuga deserunt voluptas voluptatum doloribus impedit consequatur libero doloremque, consectetur
    quas. Molestiae accusamus praesentium adipisci placeat velit. Voluptates odit excepturi, ea
    eligendi sed asperiores perferendis dolores et, doloremque aspernatur atque tempore commodi vero
    ducimus natus veritatis veniam consequuntur minus architecto repellat laborum consectetur eius
    optio! Exercitationem odit optio ipsa repudiandae numquam porro ab quaerat doloribus dolorem
    magni commodi odio obcaecati, itaque totam? Aut officia rem totam eum, ad quasi suscipit?
    Pariatur architecto a rerum dolore ad facilis officia nemo explicabo et ullam dolores eius
    fugit, quo vitae quaerat numquam molestiae nisi. Numquam quis error repellendus mollitia
    exercitationem veritatis nemo itaque nobis optio placeat a, soluta esse. Laboriosam ipsam modi
    explicabo suscipit error expedita dicta unde quidem velit repudiandae, omnis saepe molestiae
    atque deserunt commodi ab fugit provident ipsa mollitia sunt iure eligendi et harum. Iste nemo
    ab eum quam totam at! Ut laboriosam suscipit deleniti molestias aliquam et nihil accusamus,
    aspernatur ad quisquam pariatur nemo doloribus accusantium. Dolore libero perferendis eaque nemo
    facere veritatis voluptates aspernatur consequatur aliquid tempora, velit alias doloribus sed
    dolorem aliquam vero ad ipsum quia reiciendis optio facilis saepe quidem vitae? Veritatis odio
    consectetur placeat dolorem doloribus molestias sint consequuntur repellat voluptas quia id sunt
    quo magnam, voluptates harum vel a dignissimos iusto. Voluptates aliquam deserunt, ratione
    laudantium quidem eaque inventore fugiat ipsum cum ullam! Blanditiis doloremque et excepturi
    tempore non harum at quam voluptatum nobis est laudantium, voluptatibus ullam perferendis. A
    facilis, doloremque vitae explicabo sequi labore placeat maiores recusandae asperiores non
    perferendis dolorum dolores iure odio at laborum, dicta reprehenderit earum quo id laudantium
    aliquid aperiam iste? Ipsa placeat temporibus molestiae veniam corrupti quia itaque culpa maxime
    obcaecati? Ipsam, provident! Similique unde ipsum sint atque illo ullam facere ab obcaecati
    placeat temporibus ex eligendi, vel delectus sunt velit iusto laborum provident quidem mollitia
    doloremque cumque? Eius saepe sit quo nam. Quae temporibus optio sit molestiae dolore! Velit
    quisquam qui dolorem odit totam sit aliquam non rerum repudiandae quis? Optio repellat quidem
    voluptatum, voluptas, quis possimus provident blanditiis labore itaque soluta asperiores
    repellendus ad. Quisquam sint provident est doloremque voluptatibus quibusdam vero nulla
    architecto! Eligendi, placeat architecto. Accusantium, soluta enim impedit cumque cum iusto
    architecto excepturi aut sunt provident! Odio dolores doloremque autem, omnis corrupti tempora
    eius itaque aliquid eos iusto tenetur at repudiandae eaque eveniet accusamus officia accusantium
    provident repellat ducimus nobis id cupiditate neque voluptatum quod. Maiores reiciendis
    excepturi accusantium cupiditate. Quisquam quibusdam tenetur eum natus minima totam ab illo
    illum libero. Vero error, omnis neque earum et perferendis iure totam facilis, nesciunt
    laboriosam non fuga reiciendis ratione cupiditate nam voluptatibus beatae iste, temporibus
    accusamus. Quasi adipisci laboriosam sit dolores modi impedit. Architecto commodi ea
    praesentium, necessitatibus modi, eaque sint ipsam saepe labore vero corrupti omnis libero
    deserunt. Ipsam a placeat, quae veniam quis ea nemo voluptatem ad magni officiis deleniti cum
    quo quidem nisi unde fuga incidunt!
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import spinner from '@/components/form/spinner.vue'
import { usePost, useGet } from '../../composable/useHttp'
import { useRoute } from 'vue-router'
const route = useRoute()

//hooks
onMounted(async () => {
  await checkAccess()
})
const checkAccess = async () => {
  const { get, data, error } = useGet(`document/verify-link/${route.params.id}`)
  await get()
  console.log('error', error.value)
  if (error.value) console.log('data', data.value.document)
}
</script>
