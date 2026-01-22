<script setup>
const timeSlots = ['早上', '中午', '晚上', '睡前']
const usageOptions = [
  { label: '餐前', value: 'before' },
  { label: '餐後', value: 'after' },
  { label: '睡前', value: 'bedtime' },
]
const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const usageOptionsBySlot = (slot) => {
  if (slot === '睡前') {
    return [{ label: '睡前', value: 'bedtime' }]
  }
  return usageOptions
}
const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

const onOverlayClick = () => {
  closeModal()
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}
</script>

<template>
  <div class="medicine-modal__overlay" @click="onOverlayClick" @keydown="onKeydown" tabindex="0">
    <div class="medicine-modal__card" @click.stop>
      <button @click="closeModal" class="medicine-modal__close" type="button" aria-label="關閉">
        <span class="material-symbols-outlined">close</span>
      </button>
      <h1 class="medicine-modal__title">新增藥品</h1>
      <form class="medicine-modal__content" action="#">
        <div class="medicine-modal__body">
          <section class="medicine-modal__image">
            <input type="file" id="medicine-image" class="medicine-modal__file" />
            <label class="medicine-modal__image-drop" for="medicine-image">
              <img src="@/assets/images/camera.svg" alt="camera icon" />
              點擊或拖曳上傳藥品照片
            </label>
          </section>

          <section class="medicine-modal__form">
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
                <input id="quantity" type="text" />
              </div>
            </div>

            <div class="form-group">
              <label for="notes">備註</label>
              <input id="notes" type="text" />
            </div>

            <p class="medicine-modal__hint">
              當藥品數量低於七日用量或離有效期限小於 30 日會發出提醒
            </p>

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
    width: 1200px;
    max-width: 90vw;
    height: min(667px, 80vh);
    // max-height: 90vh;
    background-color: $white;
    border-radius: $radius_md;
    box-shadow: $shadowDark;
    padding: 32px 40px;
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
        gap: 32px;
        align-items: center;

        .medicine-modal__image {
          display: flex;
          justify-content: center;

          .medicine-modal__file {
            display: none;
          }

          .medicine-modal__image-drop {
            width: 100%;
            max-width: 520px;
            height: 520px;
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
        }

        .medicine-modal__form {
          display: grid;
          gap: 16px;

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
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
            padding: 10px 12px;
            border: 1px solid $primaryDark;
            border-radius: $radius_sm;
            @include body3;
          }

          .medicine-modal__hint {
            margin: 0;
            color: $primaryDark;
            @include body3;
          }

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

        .btn-primary {
          flex: .3;
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
    }
  }
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
            .form-row {
              grid-template-columns: 1fr;
            }

            input,
            select {
              min-height: 44px;
            }

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
        }
      }
    }
  }
}
</style>
