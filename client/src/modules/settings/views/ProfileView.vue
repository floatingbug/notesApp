<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {ProfileForm, DeleteAccount} from "../components";
import {useAuthStore} from "@/stores/useAuthStore.js";
import {updateAccount, getUser, deleteAccount} from "../api/settings.api.js";

const authStore = useAuthStore();
const router = useRouter();
const messages = ref({});
const errorMessages = ref({});
const isLoading = ref(false);

async function onProfileFormAction(event){
	switch(event.action){
		case "profileChanged" : updateProfile({changes: event.changes});
		break;
		case "keyPress" : handleProfileFormKeyPress({pressKontext: event.pressKontext});
		break;
	}
}

async function updateProfile({changes}){
	isLoading.value = true;

	if(Object.keys(changes).length === 0) return;

	try{
		const response = await updateAccount(changes);
		messages.value = response.data.messages;
		errorMessages.value = response.data.errorMessages;

		if(response.data.updated.length === 0) return;

		// if a field was updated, save changes in user
		for(const e of response.data.updated){
			if(e === "name"){
				authStore.user.name = changes.name;
			}
			if(e === "email"){
				authStore.user.email = changes.email;
			}
			if(e === "password"){
				authStore.user.password = changes.password;
			}
		}
	}
	catch(error){
		console.log(error);
		if(error.response.data.error.type === "password"){
			errorMessages.value.password = error.response.data.error.message;
		}
	}
	finally{
		isLoading.value = false;
	}
}

function handleProfileFormKeyPress({pressKontext}){
	switch(pressKontext){
		case "name" :
			messages.value.name = "";
			errorMessages.value.name = "";
		break;
		case "email" :
			messages.value.email = "";
			errorMessages.value.email = "";
		break;
		case "password" :
			messages.value.password = "";
			errorMessages.value.password = "";
		break;
	}
}

async function onDeleteAccountAction(event){
	if(event.action === "deleteAccount"){
		isLoading.value = true;

		try{
			const responseDeleteAccount = await deleteAccount();
			authStore.clear();
			router.push("/");
		}
		catch(error){
			console.log(error);
		}
		finally{
			isLoading.value = false;
		}
	}
}

</script>


<template>
	<div class="profile">
		<div class="profile-form-container">
			<h2>Profile Details</h2>

			<ProfileForm
				:user="authStore.user"
				:messages="messages"
				:errorMessages="errorMessages"
				:isLoading="isLoading"
				@profileForm:action="onProfileFormAction"
			/>
		</div>

		<div class="delete-account-container">
			<DeleteAccount
				@deleteAccount:action="onDeleteAccountAction"
			/>
		</div>
	</div>

	<Teleport to="body">
		<div class="overlay" v-if="isLoading"
		>
		  <ProgressSpinner aria-label="Delete account" />
		  <p class="progress-text">Sending confirmation email…</p>
		</div>
	</Teleport>
</template>


<style scoped lang="scss">
@use "@/styles/breakpoints" as bp;
@use "@/styles/media" as media;

.profile {
	display: flex;
	flex-direction: column;
	gap: var(--space-xl);
}

.profile-form-container {
	width: 70%;
	min-width: 300px;
	max-width: 700px;
}


@include media.down(bp.$bp-md) {
	.profile {
		display: flex;
		justify-content: center;
	}
}
</style>
