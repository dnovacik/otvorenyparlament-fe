<template>
    <b-container v-if="allAmendments && allAmendments.edges" class="py-2">
     <b-row>
        <b-col>
          <h4>Návrhy</h4>
          <b-row>
            <b-col>Počet nájdených návrhov: <b-badge>{{ allAmendments.totalCount }}</b-badge></b-col>
          </b-row>
          <div v-if="allAmendments && allAmendments.edges">
            <amendmentCard v-for="(node, index) in allAmendments.edges"
                      v-bind:amendment="node.node"
                      v-bind:index="index"
                      v-bind:key="node.node.id">
            </amendmentCard>
          </div>
        </b-col>
      </b-row>
      <b-row class="text-center fetch-more-button" v-if="allAmendments.edges && allAmendments.pageInfo.hasNextPage">
      <b-col>
        <b-button variant="primary" @click="showMore">Zobraziť viac</b-button>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import gql from 'graphql-tag';
import { allAmendmentsQuery } from '@/graphql/AllAmendmentsQuery.gql';

export default {
  name: 'memberAmendments',
  components: {
    amendmentCard: () => import('@/components/common/AmendmentCard.vue'),
  },
  props: {
    memberId: {type: String, required: false, default: {}},
    skipQuery: { type: Boolean, required: true, default: true},
  },
  data() {
    return {
      showMoreEnabled: false,
    };
  },
  methods: {
    showMore(event) {
      this.$apollo.queries.allAmendments.fetchMore({
        variables: {
          submitter: this.memberId,
          first: 20,
          after: this.allAmendments.pageInfo.endCursor,
          orderBy: ['-external_id'],
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newAmendments = fetchMoreResult.allAmendments.edges;
          const hasMore = fetchMoreResult.allAmendments.pageInfo.hasNextPage;
          const pageInfo = fetchMoreResult.allAmendments.pageInfo;
          const totalCount = fetchMoreResult.allAmendments.totalCount;

          return {
            cursor: pageInfo.endCursor,
            allAmendments: {
              __typename: previousResult.allAmendments.__typename,
              edges: [...previousResult.allAmendments.edges, ...newAmendments],
              pageInfo,
              totalCount,
              hasMore,
            },
          };
        },
      });
    },
  },
  apollo: {
    allAmendments: {
      query: allAmendmentsQuery,
      variables() {
        return {
          submitter: this.memberId,
          first: 20,
          orderBy: ['-external_id'],
        };
      },
      skip() {
        if (typeof this !== 'undefined') {
          return this.skipQuery;
        } else {
          return true;
        }
      },
    },
  },
};
</script>

<style>
</style>