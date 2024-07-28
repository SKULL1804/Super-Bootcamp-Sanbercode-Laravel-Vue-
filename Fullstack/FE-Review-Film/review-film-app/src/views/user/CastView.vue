<script setup>
import Cast from '@/components/layouts/CastComponent.vue';
import { ref, computed } from 'vue';
import Cast1 from '@/assets/img/cast/cast-1.webp';
import Cast2 from '@/assets/img/cast/cast-2.webp';
import Cast3 from '@/assets/img/cast/cast-3.webp';
import Cast4 from '@/assets/img/cast/cast-4.webp';
import Cast5 from '@/assets/img/cast/cast-5.webp';
import Cast6 from '@/assets/img/cast/cast-6.webp';
import Cast7 from '@/assets/img/cast/cast-7.webp';
import Cast8 from '@/assets/img/cast/cast-8.webp';

const currentPage = ref(1);
const itemsPerPage = ref(4);

const totalPages = computed(() => {
    return Math.ceil(casts.length / itemsPerPage.value);
});

const paginatedCast = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return casts.slice(start, end);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const canGoToPreviousPage = computed(() => currentPage.value > 1);
const canGoToNextPage = computed(() => currentPage.value < totalPages.value);

const casts = [
    {
        id: 1,
        name: 'Iñaki Godoy',
        avatar: Cast1,
        description: 'Iñaki Godoy Jasso (born August 25, 2003) is a Mexican actor who is known for his role as Juan Ruiz in The Imperfects (2022) and Monkey D. Luffy in Netflix’s live adaptation of One Piece (2023).'
    },
    {
        id: 2,
        name: 'Rami Malek',
        avatar: Cast2,
        description: 'Rami Said Malek (born May 12, 1981) is an American actor. He is known for portraying computer hacker Elliot Alderson in the USA Network television series Mr. Robot (2015–2019), for which he received the Primetime Emmy Award for Outstanding Lead Actor in a Drama Series, and as Queen lead singer Freddie Mercury in the biographical film Bohemian Rhapsody (2018), for which he won numerous accolades, including the Academy Award for Best Actor, becoming the first actor of Egyptian heritage to win in that category. Time magazine named Malek one of the 100 most influential people in the world in 2019.Born in Torrance, California, to Egyptian immigrant parents, he studied theater before acting in plays in New York City. He had supporting roles in film and television, including the Fox sitcom The War at Home (2005–2007), the HBO miniseries The Pacific (2010), and the Night at the Museum film trilogy (2006–2014). Since his breakthrough, Malek has starred in Papillon (2017), the crime film The Little Things (2021), played the main antagonist Lyutsifer Safin in the James Bond film No Time to Die (2021), and portrayed David Hill in Christopher Nolan’s biographical film Oppenheimer (2023).'
    },
    {
        id: 3,
        name: 'Takuya Eguchi',
        avatar: Cast3,
        description: 'Takuya Eguchi is a Japanese voice actor and singer from Setagaya, Tokyo. He is affiliated with 81 Produce. He has voiced in a number of lead roles in anime shows including Kazuya Kujo in Gosick, Yoshiharu Sagara in The Ambition of Oda Nobuna, Kon Hokaze in Ixion Saga DT, Hachiman Hikigaya in My Youth Romantic Comedy Is Wrong, As I Expected, William Twining in Devils and Realist, Takeo Gōda in My Love Story. He won Best New Actor award at the 6th Seiyu Awards, and Best Voice Actor in the Newtype Anime Awards 2015. In 2017, Eguchi launched a manga about his life called Eguchi Takuya no Gainen Planet, to be published on Kadokawa’s Dengeki Girl’s Style Online website.'
    },
    {
        id: 4,
        name: 'Ryan Reynolds',
        avatar: Cast4,
        description: 'Ryan Rodney Reynolds (born October 23, 1976) is a Canadian actor and film producer. He began his career starring in the Canadian teen soap opera Hillside (1991–1993), and had minor roles before landing the lead role on the sitcom Two Guys and a Girl between 1998 and 2001. Reynolds then starred in a range of films, including comedies such as National Lampoon’s Van Wilder (2002), Waiting... (2005), and The Proposal (2009). He also performed in dramatic roles in Buried (2010), Woman in Gold (2015), and Life (2017), starred in action films such as Blade: Trinity (2004), Green Lantern (2011), 6 Underground (2019) and Free Guy (2021), and provided voice acting in the animated features The Croods (2013), Turbo (2013), Pokémon: Detective Pikachu (2019) and The Croods: A New Age (2020).'
    },
    {
        id: 5,
        name: 'Ayumu Murase',
        avatar: Cast5,
        description: 'Ayumu Murase is a Japanese voice actor. In 2016, he won 10th Seiyu Awards for Best Male Rookie. Ayumu is his stage name, and his real name is unknown. Whereas Murase is his real surname.'
    },
    {
        id: 6,
        name: 'Cillian Murphy',
        avatar: Cast6,
        description: 'Cillian Murphy (born 25 May 1976) is an Irish actor. He made his professional debut in Enda Walsh’s 1996 play Disco Pigs, a role he later reprised in the 2001 screen adaptation. His early notable film credits include the horror film 28 Days Later (2002), the dark comedy Intermission (2003), the thriller Red Eye (2005), the Irish war drama The Wind That Shakes the Barley (2006), and the science fiction thriller Sunshine (2007). He played a transgender Irish woman in the comedy-drama Breakfast on Pluto (2005), which earned him a Golden Globe Award nomination.'
    },
    {
        id: 7,
        name: 'Masaki Suda',
        avatar: Cast7,
        description: 'Taishō Sugō (菅生 大将), known professionally as Masaki Suda (菅田 将暉), is a Japanese actor and singer. He won the Japan Academy Film Prize for Outstanding Performance by an Actor in a Leading Role. In addition, he received the Minister of Education, Culture, Sports, Science and Technology Newcomer Award in the 68th Art Award Film Division in recognition of his success. His debut song is "Mita Koto mo Nai Keshiki".'
    },
    {
        id: 8,
        name: 'Natsuki Hanae',
        avatar: Cast8,
        description: 'Natsuki Hanae is a Japanese voice actor from Kanagawa Prefecture. He is affiliated with Across Entertainment. In 2015, he won an award at the 9th Seiyuu Awards as one of the best male newcomers. He also hosts the radio show ŌHana (逢坂市立花江学園 Ōsaka Shiritsu Hanae Gakuen) along with voice actor Ryōta Ōsaka. "Hanae" is actually a pseudonym; his real surname has not been disclosed by his agency.'
    },
];
</script>

<template>
    <div>
        <section class="h-fit pt-[4vh] mb-0 mt-0 mx-[5%] space-y-2">
            <Cast :casts="paginatedCast" />

            <div class="flex items-center justify-between">
                <button class="join-item btn btn-outline" @click="previousPage" :disabled="!canGoToPreviousPage">
                    Previous page
                </button>
                <button class="join-item btn btn-outline" @click="nextPage" :disabled="!canGoToNextPage">
                    Next page
                </button>
            </div>
        </section>
    
    </div>
</template>