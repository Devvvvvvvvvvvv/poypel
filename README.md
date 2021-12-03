# poypel

## URL params description

### main params:

* id — loading session by ID
* loadname — loading session by name
* session_selected — needed for action=load, action=delete: loading/deleting session by given ID
* action=
    * create — create new session
    * save — save current session
    * update — update transaction of current session (add new transactions in new period between date_start and date_end)
    * generate — generate all new transactions for current session by given settings
    * delete — delete selected session (in session_selected)
    * load — load selected session (in session_selected)

### session params:

* id — session ID
* account_name — session name
* account_bank — bank name
* account_hours_min — min hours for random generation period between transactions
* account_hours_max — max hours for random generation period between transactions
* account_date_start — starting date for transactions
* account_date_end — ending date for transactions (can be in future)
* account_products — products ids separated with comma for random picking for transactions
* transactions[] — array for updating transactions

### transaction params:

* id — transaction ID
* type — transaction type (0 = completed, 1 = bank, 2 = hold_ship, 3 = hold_not_ship)
* name — name of transaction
* session — session ID
* amount — transaction amount
* date — transaction date
* product_id — product ID
