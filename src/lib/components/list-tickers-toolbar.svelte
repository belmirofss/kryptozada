<script>
    import { createEventDispatcher } from 'svelte';
    import Select from 'svelte-select';

    const dispatch = createEventDispatcher();

    const orderedByOptions = [
        { value: 'name', label: 'Name'},
        { value: 'symbol', label: 'Symbol'},
        { value: 'price_usd', label: 'Price'},
        { value: 'market_cap_usd', label: 'Market cap'},
        { value: 'percent_change_1h', label: '1h %'},
        { value: 'percent_change_24h', label: '24h %'},
        { value: 'percent_change_7d', label: '7d %'},
    ];

    const orderedTypeOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];

    let orderedBySelected = orderedByOptions[3];
    let orderedTypeSelected = orderedTypeOptions[1];
    let searchText = '';

    const onChanges = () => {
        dispatch('searchOrOrderEvent', {
            orderedBy: orderedBySelected.value,
            orderedType: orderedTypeSelected.value,
            searchText
        });
    }
</script>

<div class="flex flex-col lg:flex-row justify-between">
    <div class="flex flex-col">
        <label for="search-input" class="text-sm font-medium">Search for</label>
        <input id="search-input" class="py-2 px-2 mt-1 border-2 border-gray-400 rounded-lg focus:border-primary hover:border-black outline-0" bind:value={searchText} on:input={onChanges} placeholder="Type the name">
    </div>

    <div class="flex flex-col lg:flex-row">
        <div class="select-theme flex flex-col w-full mt-2 lg:mr-2 lg:w-64">
            <label for="select-sorted-by" class="text-sm font-medium">Order by</label>
            <Select id="select-sorted-by" items={orderedByOptions} value={orderedBySelected} on:select={event => {
                orderedBySelected = event.detail;
                onChanges();
            }} placeholder="Select the order by" isClearable={false} isSearchable={false}></Select>
        </div>
        
        <div class="select-theme flex flex-col w-full mt-2 lg:w-52">
            <label for="select-sorted-type" class="text-sm font-medium">Order type</label>
            <Select id="select-sorted-type" items={orderedTypeOptions} value={orderedTypeSelected} on:select={event => {
                orderedTypeSelected = event.detail;
                onChanges();
            }} placeholder="Select the order type" isClearable={false} isSearchable={false}></Select>
        </div>
    </div>
</div>

<style>
    .select-theme {
        --border: 2px solid #9ca3af;
        --borderRadius: 0.75rem;
        --inputFontSize: 1rem;
        --listZIndex: 50;
        --borderFocusColor: #FFBD59;
        --borderHoverColor: #000;
        --inputPadding: 0 0.5rem;
        --height: 44px;
        --itemHoverBG: whitesmoke;
    }
</style>