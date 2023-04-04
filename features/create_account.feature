Feature: Sign up
  New users want to create an account to use the product

  Scenario: Handle is an email
    Given handle is "user@example.com"
    When I create an account
    Then I should get a token back

  Scenario: Handle is NOT and email
    Given handle is "user_handle"
    When I create an account
    Then I should get an error
