<template>
  <q-page>
    <q-toolbar>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная страница" to="/index" />
        <q-breadcrumbs-el label="Календари" to v-on:click="calendars()" />
        <q-breadcrumbs-el :label="calendarTitle" />
      </q-breadcrumbs>
    </q-toolbar>
    <div class="row items-center">
      <div class="col-1"></div>
      <div class="col-3">
        <div
          class="q-pa-md"
          style="max-width: 350px; height: 408px; padding: 16px;"
        >
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h5" style="font-weight: bold;">
                {{ calendarTitle }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">{{
              calendarText
            }}</q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-8">
        <q-splitter
          v-model="splitterModel"
          style="height: 450px; width: 800px;"
        >
          <template v-slot:before>
            <div class="q-pa-md">
              <q-date
                v-model="data"
                :events="dates"
                event-color="orange"
                @input="calendarPickDate"
                ref="calendar"
                v-on:click="calendarClick()"
              />
            </div>
          </template>
          <q-list>
            <div v-for="event in events" :key="event.id">
              <q-item clickable>
                <q-item-section side>
                  <q-badge color="teal" :label="event.id" />
                </q-item-section>
                <q-item-section v-ripple>
                  <q-item-label style="font-size: 24px;">
                    {{ event.title }}
                  </q-item-label>
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
                      icon="edit"
                    />
                    <q-fab-action
                      :hide-label="true"
                      color="negative"
                      @click="confirmDeleteEvent(event.id)"
                      icon="delete"
                    />
                  </q-fab>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />
            </div>
          </q-list>
        </q-splitter>
      </div>
    </div>
    <q-btn
      fab
      icon="add"
      color="green"
      style="position: absolute; right: 40px; bottom: 60px"
      v-on:click="confirmCreateEvent()"
    />
    <q-dialog v-model="createConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="calendar_today" color="green" text-color="white" />
          <span class="q-ml-sm" style="font-size:16px"
            >Создание нового события</span
          >
        </q-card-section>
        <q-card-section class="q-pt-none q-gutter-md" style="max-width: 300px">
          <q-input
            rounded
            outlined
            v-model="createEventTitle"
            label="Название календаря"
          />
          <q-input
            label="Описание календаря"
            v-model="createEventText"
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
            v-on:click="createEvent()"
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
            >Вы действительно хотите удалить это событие?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Да"
            color="green"
            v-close-popup
            v-on:click="deleteEvent()"
          />
          <q-btn flat label="Нет" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { date } from 'quasar';
import { defineComponent, ref, computed } from '@vue/composition-api';
import { StateInterface } from '../store';

export default defineComponent({
  name: 'PageCalendar',
  setup(props, context) {
    let splitterModel = ref(50);
    let data = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));
    let innerMonth = 0;
    let innerYear = 0;
    let createEventTitle = ref('');
    let createEventText = ref('');
    let createConfirm = ref(false);
    let deleteId = 0;
    let deleteConfirm = ref(false);
    function calendars() {
      void context.root.$store.dispatch('calendar/getCalendars', {
        app: context,
        login: (<StateInterface>context.root.$store.state).user.login
      });
    }
    function calendarClick() {
      if (
        innerMonth !== context.root.$refs.calendar.innerModel.month ||
        innerYear !== context.root.$refs.calendar.innerModel.year
      ) {
        innerMonth = context.root.$refs.calendar.innerModel.month;
        innerYear = context.root.$refs.calendar.innerModel.year;
        void context.root.$store.dispatch('event/getDatesMonth', {
          app: context,
          id: (<StateInterface>context.root.$store.state).calendar.calendar.id,
          month: innerMonth,
          year: innerYear
        });
      }
    }
    function calendarPickDate(value: unknown, reason: unknown, details: unknown) {
      if (details.changed === true) {
        void context.root.$store.dispatch('event/getEventsDay', {
          app: context,
          id: (<StateInterface>context.root.$store.state).calendar.calendar.id,
          day: details.day,
          month: details.month,
          year: details.year
        });
      }
    }
    function confirmDeleteEvent(id: number) {
      deleteConfirm.value = true;
      deleteId = id;
    }
    function deleteEvent() {
      void context.root.$store.dispatch('event/deleteEvent', {
        app: context,
        login: (<StateInterface>context.root.$store.state).user.login,
        id: deleteId
      });
    }
    function confirmCreateEvent() {
      createEventTitle.value = '';
      createEventText.value = '';
      createConfirm.value = true;
    }
    function createEvent() {
      void context.root.$store.dispatch('event/createEvent', {
        app: context,
        title: createEventTitle,
        text: createEventText,
        calendar: (<StateInterface>context.root.$store.state).calendar.calendar
          .id,
        data: data.value + date.formatDate(Date.now(), 'HH:mm')
      });
    }
    const events = computed({
      get: () => (<StateInterface>context.root.$store.state).event.events,
      set: val => {
        context.root.$store.commit('event/updateEvents', val);
      }
    });
    const dates = computed({
      get: () => (<StateInterface>context.root.$store.state).event.dates,
      set: val => {
        context.root.$store.commit('event/updateEvents', val);
      }
    });
    const calendarTitle = computed({
      get: () =>
        (<StateInterface>context.root.$store.state).calendar.calendar.title,
      set: val => {
        context.root.$store.commit('calendar/updateCalendarTitle', val);
      }
    });
    const calendarText = computed({
      get: () =>
        (<StateInterface>context.root.$store.state).calendar.calendar.title,
      set: val => {
        context.root.$store.commit('calendar/updateCalendarText', val);
      }
    });

    return {
      splitterModel,
      data,
      createEventTitle,
      createEventText,
      createConfirm,
      deleteConfirm,
      calendars,
      calendarClick,
      calendarPickDate,
      confirmDeleteEvent,
      deleteEvent,
      confirmCreateEvent,
      createEvent,
      events,
      dates,
      calendarTitle,
      calendarText
    };
  }
});
</script>
