# PNF Shopify Store

## Subscribable Products

In order for a product to show up in the product list on the storefront's home page,
it must have the tags `available` and `subscribable`.

_Metafields_
_Images_
_Descriptions_

## Quantity Based Discounts

BOX-OF-2:
| Discount Name | Code Discount Criteria   | ReCharge Discount Criteria | Discount Total |
| ------------- | ------------------------ | -------------------------- | -------------- |
| BOX-OF-2      | `cart.items.length > 1`  | Cart price > 49.99         | $20.00         |
| BOX-OF-3      | `cart.items.length > 2`  | Cart price > 99.98         | $40.00         |
| BOX-OF-4      | `cart.items.length > 3`  | Cart price > 149.97        | $60.00         |
| BOX-OF-5      | `cart.items.length > 4`  | Cart price > 199.96        | $80.00         |
| BOX-OF-6      | `cart.items.length > 5`  | Cart price > 249.95        | $100.00        |
| BOX-OF-7      | `cart.items.length > 6`  | Cart price > 299.94        | $120.00        |
| BOX-OF-8      | `cart.items.length > 7`  | Cart price > 349.93        | $140.00        |
| BOX-OF-9      | `cart.items.length > 8`  | Cart price > 399.92        | $160.00        |
| BOX-OF-10     | `cart.items.length > 9`  | Cart price > 449.91        | $180.00        |
| BOX-OF-11     | `cart.items.length > 10` | Cart price > 399.92        | $200.00        |
| BOX-OF-12     | `cart.items.length > 11` | Cart price > 449.91        | $220.00        |
| BOX-OF-13     | `cart.items.length > 12` | Cart price > 499.90        | $240.00        |
| BOX-OF-14     | `cart.items.length > 13` | Cart price > 549.89        | $260.00        |
| BOX-OF-15     | `cart.items.length > 14` | Cart price >  599.88       | $280.00        |
