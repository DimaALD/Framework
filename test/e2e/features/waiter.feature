@all
Feature: Menu

  @sandisk
  Scenario: Verify user can open menu
    When  I open "https://www.sandisk.com/" url
    When  I click "SHOP NOW" in "Menu"
    And  I switch to "next" tab
