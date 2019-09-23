<?php
  /**
   * Plugin Name: Wordpress Image Carousel Plugin
   * Plugin URI: https://github.com/DylanHarrisonGithub/wp-img-carousel-plugin
   * Description: A simple image carousel Gutenberg block
   * Author: Dylan Harrison
   */
  add_action('wp_enqueue_block_assets', function() {
    

  });
  add_action('enqueue_block_editor_assets', function() {
    wp_register_style(
      'wp-image-carousel-plugin', 
      plugins_url('wp-image-carousel-plugin.css', __FILE__)
    );
    wp_enqueue_style('wp-image-carousel-plugin');
    wp_enqueue_script(
      'wp-image-carousel-script',
      plugins_url('wp-image-carousel-script.js', __FILE__),
      array('wp-blocks')
    );
  });
?>