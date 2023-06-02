-- AlterTable
CREATE SEQUENCE address_id_seq;
ALTER TABLE "Address" ALTER COLUMN "id" SET DEFAULT nextval('address_id_seq');
ALTER SEQUENCE address_id_seq OWNED BY "Address"."id";

-- AlterTable
CREATE SEQUENCE companys_id_seq;
ALTER TABLE "Companys" ALTER COLUMN "id" SET DEFAULT nextval('companys_id_seq');
ALTER SEQUENCE companys_id_seq OWNED BY "Companys"."id";

-- AlterTable
CREATE SEQUENCE order_id_seq;
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT nextval('order_id_seq');
ALTER SEQUENCE order_id_seq OWNED BY "Order"."id";

-- AlterTable
CREATE SEQUENCE products_id_seq;
ALTER TABLE "Products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE products_id_seq OWNED BY "Products"."id";

-- AlterTable
CREATE SEQUENCE stock_id_seq;
ALTER TABLE "Stock" ALTER COLUMN "id" SET DEFAULT nextval('stock_id_seq');
ALTER SEQUENCE stock_id_seq OWNED BY "Stock"."id";
