import React from 'react';
import './App.css';
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, SearchkitComponent,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit';

import extend from 'lodash/extend';

import { ButtonGroup } from 'react-bootstrap';


import TwitterAccountListItem from "./TwitterAccountListItem.js";

const host = "http://localhost:9200/elastic/"
const searchkit = new SearchkitManager(host)


class AccountsComponent extends React.Component {
  constructor(props) {
        super(props);
    }


  render() {
    const twitterItem = (
          <TwitterAccountListItem anotherprop="anothervalue" />
        );


    return(
      <div>
      <SearchkitProvider searchkit={searchkit}>

        <LayoutBody>

          <SideBar>
            <HierarchicalMenuFilter fields={["user.name.keyword"]} title="Usuarios" id="users"/>
            <RangeFilter min={0} max={10000} field="user.followers_count" id="followers" title="Followers" showHistogram={true}/>
            <RangeFilter min={0} max={10000} field="user.friends_count" id="seguidos" title="Seguidos" showHistogram={true}/>
          </SideBar>

          <LayoutResults>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["hashtags^2"]}/>

            <ActionBar>
                <ActionBarRow>
                  <HitsStats translations={{
                    "hitstats.results_found":"{hitCount} results found"
                  }}/>
                  <ViewSwitcherToggle/>
                  <SortingSelector options={[
                    {label:"Relevance", field:"_score", order:"desc"},
                    {label:"Latest Releases", field:"released", order:"desc"},
                    {label:"Earliest Releases", field:"released", order:"asc"}
                  ]}/>
                </ActionBarRow>
                <ActionBarRow>
                  <GroupedSelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>
              </ActionBar>
            <ViewSwitcherHits
                  hitsPerPage={8} highlightFields={["message.keyword"]}
                  sourceFilter={["user", "retweet_count", "favorite_count", "extended_tweet","quoted_status.extended_tweet", "text"]}
                  hitComponents={[
                    {key:"list", title:"List", itemComponent:twitterItem}
                  ]}
                  scrollTo="body"
              />

              <NoHits suggestionsField={"title"}/>
              <Pagination showNumbers={true}/>

            </LayoutResults>

        </LayoutBody>


      </SearchkitProvider>

      </div>
    )
    }

}

export default AccountsComponent;
