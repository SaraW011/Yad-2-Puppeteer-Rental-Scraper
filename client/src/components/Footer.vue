<template>
  <footer class="footer">
      <p class="footer__copyright">
          &copy; {{ new Date().getFullYear() }} Sara Weissman
      </p>
  </footer>
</template>

<script>
export default {}
</script>

<style>
.footer {
  padding: 0;
  margin: 0 auto 60px auto;
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .footer {
      width: calc(100% - (19px * 2));
  }
}

@media screen and (max-width: 320px) {
  .footer {
      margin-bottom: 36px;
  }
}

.footer__copyright {
  color: #f7f7f7;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 320px) {
  .footer__copyright {
      font-size: 14px;
      line-height: 17px;
  }
}
</style>
