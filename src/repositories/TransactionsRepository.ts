import Transaction from '../models/Transaction';

interface Balance {
   income: number;
   outcome: number;
   total: number;
}

interface TransactionInterface {
   title: string;
   value: number;
   type: 'income' | 'outcome';
}

class TransactionsRepository {
   private transactions: Transaction[];

   constructor() {
      this.transactions = [];
   }

   public all(): Transaction[] {
      return this.transactions
   }

   public getBalance(): Balance {

      const transactions = this.all()

      const balance = transactions.reduce((accumulate, item) => {

         accumulate[item.type] += item.value

         if ("income" === item.type) {
            accumulate.total += item.value
         }
         else if ("outcome" === item.type) {
            accumulate.total -= item.value
         }

         return accumulate

      }, {
         income: 0,
         outcome: 0,
         total: 0
      })

      return balance
   }

   public create({ title, value, type }: TransactionInterface): Transaction {

      if ("outcome" === type) {
         const balance = this.getBalance()

         if (value > balance.total)
            throw Error("Don't have enough for this")
      }

      const transition = new Transaction({
         title,
         value,
         type
      })

      this.transactions.push(transition)

      return transition
   }
}

export default TransactionsRepository;
