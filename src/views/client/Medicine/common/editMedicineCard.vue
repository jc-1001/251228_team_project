<script setup>
import { ref } from 'vue'

const timeSlots = ['早上', '中午', '下午', '晚上']
const usageOptions = [
  { label: '無', value: 'none' },
  { label: '飯前', value: 'before' },
  { label: '飯後', value: 'after' },
  { label: '睡前', value: 'bedtime' },
]
const quantityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const usageOptionsBySlot = (slot) => {
  if (slot === '晚上') {
    return [{ label: '無', value: 'none' }, { label: '睡前', value: 'bedtime' }]
  }
  return usageOptions
}
const emit = defineEmits(['closeEditCard'])
const isActive = ref(true)

const closeEditCard = () => {
  emit('closeEditCard')
}

const onOverlayClick = () => {
  closeEditCard()
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeEditCard()
  }
}
</script>

<template>
  <div class="medicine-modal__overlay" @click="onOverlayClick" @keydown="onKeydown" tabindex="0">
    <div class="medicine-modal__card" @click.stop>
      <button @click="closeEditCard" class="medicine-modal__close" type="button" aria-label="關閉">
        <span class="material-symbols-outlined">close</span>
      </button>
      <label>
        <input v-model="isActive" type="checkbox" class="checkbox" />
        <span class="btn-box">
          <span class="btn"></span>
        </span>
        <span class="text">{{ isActive ? '已啟用' : '已停用' }}</span>
      </label>
      <h1 class="medicine-modal__title">修改詳情</h1>
      <form class="medicine-modal__content" action="#">
        <div class="medicine-modal__body">
          <section class="medicine-modal__image">
            <div class="medicine-modal__image-form">
              <div class="form-group">
                <label for="medicine-name">藥品名</label>
                <input id="medicine-name" type="text" placeholder="例如：阿斯匹靈" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="expiration-date">有效期限</label>
                  <input id="expiration-date" type="date" />
                </div>
                <div class="form-group">
                  <label for="quantity">藥品數量</label>
                  <input id="quantity" type="number" />
                </div>
              </div>
            </div>
            <input type="file" id="medicine-image" class="medicine-modal__file" />
            <label class="medicine-modal__image-drop" for="medicine-image">
              <img src="@/assets/images/camera.svg" alt="camera icon" />
              點擊或拖曳上傳藥品照片
            </label>
          </section>

          <section class="medicine-modal__form">
            <div class="form-group">
              <label for="notes">備註</label>
              <input id="notes" type="text" />
            </div>

            <div class="medicine-modal__schedule">
              <div class="schedule__head"></div>
              <div class="schedule__head">醫囑用法</div>
              <div class="schedule__head">服用數量</div>

              <template v-for="slot in timeSlots" :key="slot">
                <div class="schedule__row-label">{{ slot }}</div>
                <select class="schedule__select">
                  <option
                    v-for="opt in usageOptionsBySlot(slot)"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
                <select class="schedule__select">
                  <option v-for="qty in quantityOptions" :key="qty" :value="qty">
                    {{ qty }}
                  </option>
                </select>
              </template>
            </div>
          </section>
        </div>

        <div class="medicine-modal__footer">
          <button class="btn-primary" type="submit">儲存</button>
          <button class="btn-delete" type="submit" @click="closeEditCard">刪除</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

* {
  box-sizing: border-box;
}

.medicine-modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  display: grid;
  place-items: center;
  z-index: 1000;

  .medicine-modal__card {
    position: relative;
    width: 800px;
    max-width: 90vw;
    max-height: 90vh;
    background-color: $white;
    border-radius: $radius_md;
    box-shadow: $shadowDark;
    padding: 16px 40px;
    gap: 16px;
    overflow: auto;

    .medicine-modal__title {
      @include title2;
      color: $primaryDark;
      text-align: center;
      margin-bottom: 16px;
    }

    .medicine-modal__close {
      @include closeButton;
      padding-top: 5px;
    }

    .medicine-modal__content {
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 24px;

      .medicine-modal__body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: self-start;

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .form-group {
          display: grid;
          gap: 8px;
        }

        label {
          @include body2;
          color: $primaryDark;
        }

        input,
        select {
          padding: 8px;
          border: 1px solid $primaryDark;
          border-radius: $radius_sm;
          @include body3;
        }

        .medicine-modal__image {
          display: grid;
          gap: 8px;

          .medicine-modal__file {
            display: none;
          }

          .medicine-modal__image-drop {
            width: 100%;
            max-width: 520px;
            height: 164px;
            border-radius: $radius_sm;
            border: 1px solid $primaryDark;
            background-color: $primaryLight;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: $primaryDark;
            @include body3;
          }

          .medicine-modal__image-form {
            display: grid;
            gap: 16px;
          }
        }

        .medicine-modal__form {
          display: grid;
          gap: 16px;

          .medicine-modal__schedule {
            display: grid;
            grid-template-columns: 80px 1fr 1fr;
            gap: 10px 12px;
            padding: 16px;
            border-radius: $radius_sm;
            background-color: $grayLight;

            .schedule__head {
              @include body3;
              color: $primaryDark;
              text-align: center;
            }

            .schedule__row-label {
              @include body3;
              color: $primaryDark;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .schedule__select {
              width: 100%;
            }
          }
        }
      }

      .medicine-modal__footer {
        display: flex;
        justify-content: center;
        gap: 24px;

        .btn-primary {
          flex: 0.3;
          background: $primaryDark;
          color: $white;
          padding: 8px;
          border: none;
          border-radius: $radius_sm;
          @include subtitle2(true);
          cursor: pointer;
          transition: background 0.3s;
          &:hover {
            background-color: $white;
            color: $primaryDark;
            outline: 1px solid $primaryDark;
          }
        }
      }
      .btn-delete {
        flex: 0.3;
        background: $accent;
        color: $white;
        padding: 8px;
        border: none;
        border-radius: $radius_sm;
        @include subtitle2(true);
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background-color: $accentLight;
          color: $accent;
          outline: 1px solid $accent;
        }
      }
    }
  }
}

.btn-box {
  cursor: pointer;
  display:inline-block;
  vertical-align:middle;
  width: 40px;
  height: 20px;
  border-radius:100px;
  background-color: $disabled;
  box-shadow: 0px 3px 0px rgba(0,0,0,.13) inset;
}
.btn-box .btn {
  display:inline-block;
  width: 20px;
  height: 20px;
  border-radius:50%;
  background-color: #fff;
  margin-left: 0;
  transition: .5s;
  box-shadow:1px 2px 5px rgba(0,0,0,.3);
}
.text{
  display:inline-block;
  vertical-align:middle;
  margin-left:10px;
  @include body2;
  color: $primaryDark;
}
.checkbox {
  position:absolute;
  opacity:0;
}
.checkbox:checked + .btn-box {
  background-color: $primary;
}
.checkbox:checked + .btn-box .btn {
  margin-left: 20px;
}


@media (max-width: 1024px) {
  .medicine-modal__overlay {
    .medicine-modal__card {
      width: min(920px, 100%);

      .medicine-modal__content {
        .medicine-modal__body {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .medicine-modal__overlay {
    place-items: start center;
    padding: 16px;

    .medicine-modal__card {
      padding: 24px 20px;
      max-height: 90vh;
      width: 100%;
      max-width: 100%;

      .medicine-modal__content {
        .medicine-modal__body {
          gap: 20px;

          .medicine-modal__image {
            .medicine-modal__image-drop {
              height: clamp(220px, 45vw, 320px);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .medicine-modal__overlay {
    .medicine-modal__card {
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      padding: 10px 8px;

      .medicine-modal__content {
        .medicine-modal__body {
          .medicine-modal__form {
            .medicine-modal__schedule {
              grid-template-columns: 64px 1fr;
              gap: 16px 20px;

              .schedule__head:nth-child(3) {
                display: none;
              }

              .schedule__select:nth-of-type(2n) {
                grid-column: 2;
              }
            }
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          input,
          select {
            min-height: 44px;
          }
        }
      }
    }
  }
}
</style>
