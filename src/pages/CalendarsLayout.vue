<template>
  <q-page>
    <q-toolbar>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная страница" to="/index" />
        <q-breadcrumbs-el label="Календари" />
      </q-breadcrumbs>
    </q-toolbar>
    <div class="row justify-center">
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div
              class="text-h3 text-center"
              v-if="context.root.$store.state.calendar.calendars.length === 0"
            >
              У вас нет созданных календарей...
            </div>
            <div class="text-h3 text-center" v-else>КАЛЕНДАРИ</div>
          </q-card-section>
          <template>
            <q-list>
              <div
                v-for="calendar in context.root.$store.state.calendar.calendars"
                :key="calendar.id"
              >
                <q-item clickable>
                  <q-item-section side>
                    <q-badge color="teal" :label="calendar.id" />
                  </q-item-section>
                  <q-item-section v-ripple v-on:click="toCalendar(calendar.id)">
                    <q-item-label style="font-size: 24px;">{{
                      calendar.title
                    }}</q-item-label>
                    <q-item-label caption style="font-size: 16px;">{{
                      calendar.text
                    }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-fab
                      external-label
                      color="primary"
                      icon="keyboard_arrow_right"
                      direction="right"
                      :hide-label="true"
                    >
                      <q-fab-action
                        :hide-label="true"
                        color="warning"
                        @click="
                          confirmEditCalendar(
                            calendar.id,
                            calendar.title,
                            calendar.text
                          )
                        "
                        icon="edit"
                        style="left:5px;"
                      />
                      <q-fab-action
                        :hide-label="true"
                        color="negative"
                        @click="confirmDeleteCalendar(calendar.id)"
                        icon="delete"
                      />
                    </q-fab>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
              </div>
            </q-list>
          </template>
        </q-card>
      </div>
    </div>
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="confirmCreateCalendar()"
    />
    <q-dialog v-model="createConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="calendar_today" color="green" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Создание нового календаря</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="createCalendarTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="createCalendarText"
            filled
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="createCalendar()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Вы действительно хотите удалить этот календарь?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="deleteCalendar()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="edit" color="blue" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Редактирование календаря</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="editCalendarTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="editCalendarText"
            filled
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Сохранить"
            color="green"
            v-close-popup
            v-on:click="editCalendar()"
          />
          <q-btn flat label="Отмена" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { StateInterface } from '../store';

let createConfirm = ref(false);
let deleteConfirm = ref(false);
let editConfirm = ref(false);
let deleteId = 0;
let editId = 0;
let createCalendarTitle = ref('');
let createCalendarText = ref('');
let editCalendarTitle = ref('');
let editCalendarText = ref('');

export default defineComponent({
  name: 'PageCalendar',
  setup(props, context) {
    function toCalendar(id: number) {
      void context.root.$store.dispatch('calendar/getCalendar', {
        app: context,
        id: id
      });
    }
    function confirmCreateCalendar() {
      createCalendarTitle = ref('');
      createCalendarText = ref('');
      createConfirm = ref(true);
    }
    function createCalendar() {
      void context.root.$store.dispatch('calendar/createCalendar', {
        app: context,
        login: (<StateInterface>context.root.$store.state).user.login,
        title: createCalendarTitle,
        text: createCalendarText
      });
    }
    function confirmDeleteCalendar(id: number) {
      deleteConfirm = ref(true);
      deleteId = id;
    }
    function deleteCalendar() {
      void context.root.$store.dispatch('calendar/deleteCalendar', {
        app: context,
        id: deleteId
      });
    }
    function confirmEditCalendar(id: number, title: string, text: string) {
      editCalendarTitle = ref(title);
      editCalendarText = ref(text);
      editConfirm = ref(true);
      editId = id;
    }
    function editCalendar() {
      void context.root.$store.dispatch('calendar/editCalendar', {
        app: context,
        id: editId,
        title: editCalendarTitle.value,
        text: editCalendarText.value
      });
    }
    const calendars = computed(
      () => (<StateInterface>context.root.$store.state).calendar.calendars
    );

    return {
      context,
      createConfirm,
      editConfirm,
      deleteConfirm,
      createCalendarText,
      createCalendarTitle,
      toCalendar,
      confirmCreateCalendar,
      confirmDeleteCalendar,
      confirmEditCalendar,
      createCalendar,
      editCalendar,
      deleteCalendar,
      editCalendarTitle,
      editCalendarText,
      calendars,
    };
  }
});
</script>
