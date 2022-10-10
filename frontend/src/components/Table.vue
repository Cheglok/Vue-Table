<script>
import axios from 'axios';
export default {
    data() {
        return {
            tableData: [],
            setData: [],
            filterField: '',
            filterOption: '',
            filterValue: '',
            tableRows: 4,
            currentPage: 1,
            items: [],
        }
    },
    methods: {
        async getProducts() {
            try {
                const response = await axios.get("http://localhost:5000/products");
                this.tableData = response.data;
                this.setData = response.data;
            } catch (err) {
                console.log(err);
            }
        },
        sortTableUp(field) {
            this.setData.sort((a, b) => a[field] > b[field] ? 1 : -1);
        },
        sortTableDown(field) {
            this.setData.sort((a, b) => a[field] < b[field] ? 1 : -1);
        },
        filter() {
            this.resetFilter();
            switch (this.filterOption) {
                case 'equal':
                    this.setData = this.setData.filter(item => item[this.filterField] == this.filterValue);
                    break;
                case 'contain':
                    this.setData = this.setData.filter(item => String(item[this.filterField]).includes(this.filterValue));
                    break;
                case 'more':
                    this.setData = this.setData.filter(item => item[this.filterField] > +this.filterValue);
                    break;
                case 'less':
                    this.setData = this.setData.filter(item => item[this.filterField] < +this.filterValue);
            }
        },
        resetFilter() {
            this.setData = this.tableData;
            this.currentPage = 1;
        },
        goToPage(page) {
            if (page >= 1 && page <= this.pages) {
                this.currentPage = page;
            }
        }
    },
    mounted() {
        this.getProducts();
    },
    computed: {
        displayData() {
            let startItem = (this.currentPage - 1) * this.tableRows;
            let endItem = this.currentPage * this.tableRows;
            return this.setData.slice(startItem, endItem);
        },
        pages() {
            return Math.ceil(this.setData.length / this.tableRows);
        }
    },
}
</script>


<template>
    <div class="container">
        <main class="main-content">
            <form class="form main-content__form" @submit.prevent="filter">
                <h2 class="form__heading">Filtration</h2>
                <div class="form__body">
                    <div class="form__input-group">
                        <label class="form__label" for="filerField">field
                            <select class="form__select" v-model="filterField" required id="filerField">
                                <option value="name">Name</option>
                                <option value="amount">Amount</option>
                                <option value="distance">Distance</option>
                            </select>
                        </label>
                        <label class="form__label" for="filterOption">condition
                            <select class="form__select" v-model="filterOption" required id="filterOption">
                                <option value="equal">Equal</option>
                                <option value="contain">Contain</option>
                                <option value="more">More</option>
                                <option value="less">Less</option>
                            </select>
                        </label>
                        <label class="form__label" for="filterValue">value
                            <input class="form__input" type="text" v-model="filterValue" required id="filterValue">
                        </label>
                    </div>
                    <div class="form__button-group">
                        <button type="submit" class="form__button">Filter</button>
                        <button type="button" @click.prevent="resetFilter" class="form__button">reset</button>
                    </div>
                </div>
            </form>
            <table class="table main-content__table">
                <tr class="table__row">
                    <th class="table__head">
                        <p class="table__head-text">Data</p>
                    </th>
                    <th class="table__head">
                        <p class="table__head-text">Name</p>
                        <div class="table__button-group button-group">
                            <button class="button-group__button" @click="sortTableDown('name')"><i
                                class="fa fa-arrow-down" aria-hidden="true"></i></button>
                            <button class="button-group__button" @click="sortTableUp('name')"><i class="fa fa-arrow-up"
                                                                                                 aria-hidden="true"></i>
                            </button>
                        </div>
                    </th>
                    <th class="table__head">
                        <p class="table__head-text">Amount</p>
                        <div class="table__button-group button-group">
                            <button class="button-group__button" @click="sortTableUp('amount')"><i
                                class="fa fa-arrow-up" aria-hidden="true"></i></button>
                            <button class="button-group__button" @click="sortTableDown('amount')"><i
                                class="fa fa-arrow-down" aria-hidden="true"></i></button>
                        </div>
                    </th>
                    <th class="table__head">
                        <p class="table__head-text">Distance</p>
                        <div class="table__button-group button-group">
                            <button class="button-group__button" @click="sortTableUp('distance')"><i
                                class="fa fa-arrow-up" aria-hidden="true"></i></button>
                            <button class="button-group__button" @click="sortTableDown('distance')"><i
                                class="fa fa-arrow-down" aria-hidden="true"></i></button>
                        </div>
                    </th>
                </tr>
                <tr class="table__row" v-if="displayData.length" v-for="item in displayData">
                    <td class="table__data" v-for="value in item">{{ value }}</td>
                </tr>
                <tr v-else>
                    <td><h3>Нет записей</h3></td>
                </tr>
            </table>
            <div class="navigation">
                <div class="pagination-group">
                    <button class="pagination-group__button" @click="goToPage(currentPage - 1)">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <button class="pagination-group__button" v-if="currentPage > 1" @click="goToPage(1)">1</button>
                    <!-- показывай единичку слева если текущая страница не первая-->
                    <button class="pagination-group__button" v-if="(currentPage > 2 && pages < 6) || currentPage == 3"
                            @click="goToPage(2)">2
                    </button>
                    <!-- показывай двойку если текущая страница 3 или старше 2 и страниц не более 5-->
                    <button class="pagination-group__button" v-if="currentPage > 3 && pages < 6" @click="goToPage(3)">
                        3
                    </button>
                    <!-- показывай тройку если текущая страница старше 3 и страниц не более 5-->
                    <button class="pagination-group__button" v-if="currentPage > 4 && pages < 6" @click="goToPage(4)">
                        4
                    </button>
                    <!-- показывай четвёрку если текущая страница старше 4 и страниц не более 5-->
                    <button class="dottes" v-if="currentPage > 3 && pages > 5"> ...</button>
                    <!-- показывай многоточие если текущая страница старше 3 и страниц более 5-->
                    <button class="pagination-group__button"
                            v-if="(currentPage == pages || currentPage == pages -1) && pages > 5"
                            @click="goToPage(pages - 2)"> {{ pages - 2 }}
                    </button>
                    <!-- показывай предпредпоследнюю если текущая страница последняя и страниц более 5-->
                    <button class="pagination-group__button" v-if="currentPage == pages && pages > 5"
                            @click="goToPage(pages - 1)"> {{ pages - 1 }}
                    </button>
                    <!-- показывай предпоследнюю если текущая страница последняя и страниц более 5-->
                    <button class="pagination-group__button"><b style="color: red;">{{ currentPage }}</b></button>
                    <!--Текущая страница-->
                    <button class="pagination-group__button" v-if="currentPage == 1 && pages > 1" @click="goToPage(2)">
                        2
                    </button>
                    <!-- показывай двойку если текущая страница 1 и страниц более 1-->
                    <button class="pagination-group__button" v-if="(currentPage == 1 || currentPage ==2) && pages > 2"
                            @click="goToPage(3)">3
                    </button>
                    <!-- показывай 3 если текущая страница 1 или 2 и страниц более 2-->
                    <button class="dottes" v-if="currentPage < pages - 2 && pages > 5"> ...</button>
                    <!-- показывай многоточие если текущая страница младше предпоследней и страниц более 5-->
                    <button class="pagination-group__button" v-if="pages == 5 && currentPage < 4" @click="goToPage(4)">
                        4
                    </button>
                    <!--покажи 4 если всего 5 страниц и страница меньше 4 -->
                    <button class="pagination-group__button" v-if="currentPage == pages - 2 && pages > 5"
                            @click="goToPage(pages - 1)">{{ pages - 1 }}
                    </button>
                    <!-- показывай предпоследнюю если текущая страница предпредпоследняя и страниц более 5-->
                    <button class="pagination-group__button" v-if="currentPage < pages && pages > 3"
                            @click="goToPage(pages)">{{ pages }}
                    </button>
                    <!-- показывай последнюю страницу если текущая страница не последняя-->
                    <button class="pagination-group__button" @click="goToPage(currentPage + 1)">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="rows-controls">
                    Количество строк в таблице: {{ tableRows }}
                    <div class="button-group">
                        <button class="button-group__button" @click="this.tableRows--">-</button>
                        <button class="button-group__button" @click="this.tableRows++">+</button>
                    </div>
                </div>
            </div>
            <hr>
        </main>
    </div>
</template>